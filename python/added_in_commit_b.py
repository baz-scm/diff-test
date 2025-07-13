
from dataclasses import dataclass
from typing import List, Set, Dict, Tuple, Optional


@dataclass
class LineRange:
    start: int
    end: int
    
    def overlaps(self, other: 'LineRange') -> bool:
        """Check if this line range overlaps with another."""
        return not (self.end < other.start or other.end < self.start)


@dataclass
class DiffChunk:
    line_range: LineRange
    content: str
    change_type: str  # 'add', 'remove', 'modify'


@dataclass
class PRFileDiff:
    file_path: str
    chunks: List[DiffChunk]
