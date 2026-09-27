import unittest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "src"))

from ai_project.cli import main


class SmokeTest(unittest.TestCase):
    def test_cli_returns_success(self):
        self.assertEqual(main(), 0)


if __name__ == "__main__":
    unittest.main()
