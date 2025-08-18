import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const cats: Cat[] = [
        {
          id: 1,
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
          createdAt: new Date(),
        },
      ];
      
      jest.spyOn(catsService, 'findAll').mockResolvedValue(cats);

      expect(await catsController.findAll()).toBe(cats);
      expect(catsService.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should return limited cats when limit is provided', async () => {
      const cats: Cat[] = [
        {
          id: 1,
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
          createdAt: new Date(),
        },
      ];
      
      jest.spyOn(catsService, 'findAll').mockResolvedValue(cats);

      expect(await catsController.findAll(5)).toBe(cats);
      expect(catsService.findAll).toHaveBeenCalledWith(5);
    });
  });

  describe('create', () => {
    it('should create a new cat', async () => {
      const createCatDto = {
        age: 2,
        breed: 'Bombay',
        name: 'Pixel',
      };
      
      const expectedCat: Cat = {
        id: 1,
        ...createCatDto,
        createdAt: new Date(),
      };

      jest.spyOn(catsService, 'create').mockReturnValue(expectedCat);

      const result = await catsController.create(createCatDto);
      
      expect(result).toBe(expectedCat);
      expect(catsService.create).toHaveBeenCalledWith(createCatDto);
    });
  });

  describe('findOne', () => {
    it('should return a single cat', async () => {
      const expectedCat: Cat = {
        id: 1,
        age: 2,
        breed: 'Bombay',
        name: 'Pixel',
        createdAt: new Date(),
      };

      jest.spyOn(catsService, 'findOne').mockReturnValue(expectedCat);

      const result = await catsController.findOne(1);
      
      expect(result).toBe(expectedCat);
      expect(catsService.findOne).toHaveBeenCalledWith(1);
    });
  });
});
