"""Print the interpreter identity used by this project."""

import sys


if __name__ == "__main__":
    print(f"python={sys.executable}")
    print(f"version={sys.version.split()[0]}")
