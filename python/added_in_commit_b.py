
from dataclasses import dataclass
from typing import List, Set, Dict, Tuple, Optional


@dataclass
class LineRange:
    start_line: int
    end_line: int
    
    def overlaps(self, other: 'LineRange') -> bool:
        """Check if this line range overlaps with another."""
        return not (self.end < other.start_line or other.end_line < self.start)


@dataclass
class DiffChunk:
    line_range: LineRange
    content: str
    change_type: str  # 'add', 'remove', 'modify'
    side: Literal['left', 'right']


@dataclass
class PRFileDiff:
    file_path: str
    chunks: List[DiffChunk]

    def get_chunks_content(self) -> list[str]:
        return [
            c.content for c in self.chunks
        ]


