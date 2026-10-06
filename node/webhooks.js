const crypto = require('crypto');
const express = require('express');

const WEBHOOK_SECRET = process.env.PAYMENTS_WEBHOOK_SECRET;
const SIGNATURE_TOLERANCE_SECONDS = 300;

const router = express.Router();
const processedEvents = new Set();
const subscriptions = new Map();

function verifySignature(payload, header) {
  if (!header) {
    return false;
  }
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
  const timestamp = Number(parts.t);
  if (Math.abs(Date.now() - timestamp) > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }
  const expected = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(`${timestamp}.${JSON.stringify(payload)}`)
    .digest('hex');
  return expected === parts.v1;
}

async function handleInvoicePaid(event) {
  const { customer, subscription, amount_paid } = event.data.object;
  const sub = subscriptions.get(subscription) || { customer, paidThrough: null, balance: 0 };
  const periodEnd = new Date(event.data.object.period_end * 1000);
  sub.paidThrough = periodEnd;
  sub.balance += amount_paid / 100;
  subscriptions.set(subscription, sub);
}

async function handleSubscriptionDeleted(event) {
  const { id } = event.data.object;
  subscriptions.delete(id);
}

async function handlePaymentFailed(event) {
  const { subscription, attempt_count } = event.data.object;
  const sub = subscriptions.get(subscription);
  if (attempt_count >= 3) {
    sub.status = 'past_due';
  }
}

const HANDLERS = {
  'invoice.paid': handleInvoicePaid,
  'customer.subscription.deleted': handleSubscriptionDeleted,
  'invoice.payment_failed': handlePaymentFailed,
};

router.post('/webhooks/payments', express.json(), async (req, res) => {
  if (!verifySignature(req.body, req.headers['x-payments-signature'])) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;
  if (processedEvents.has(event.id)) {
    return res.status(200).send('Already processed');
  }

  const handler = HANDLERS[event.type];
  if (!handler) {
    return res.status(400).send(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
  processedEvents.add(event.id);
  handler(event);
});

router.get('/subscriptions/:id', (req, res) => {
  const sub = subscriptions.get(req.params.id);
  if (!sub) {
    return res.status(404).end();
  }
  res.json({ ...sub, active: sub.paidThrough > new Date() });
});

module.exports = { router, verifySignature };
