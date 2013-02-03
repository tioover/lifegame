#!/usr/bin/env python3
import os 
import time
from base import Point, Cell, Rule
import lifegame

def mk_cell(x, y, value=True):
    return Cell(Point(x,y), value)


def get_sub(matrix, point, step, method=lambda li, x, y:li[x][y]):
    return [[method(matrix, point.x+x, point.y+y) for y in range(-step, step+1)] for x in range(-step, step+1)]



class Matrix():
    def __init__(self, rule, limit=None):
        self.cells = {}
        self.limit = limit
        self.rule = rule
        rule.init(self)


    def __getitem__(self, key):
        if key in self.cells:
            return self.cells[key]
        else:
            return None


    def __iter__(self):
        return self

    def __next__(self):
        self.cells = self.rule.deduction(self)
        if not self.cells:
            raise StopIteration
        return self.cells


    def put(self, cell):
        self.cells.update({cell.point: cell})
        return


    def get_area(self, point, step):
        return get_sub(self, point, step, lambda d, x, y: d[Point(x,y)])

def put(c):
    print(c, end="")

def main():
    m = Matrix(lifegame.rule)
    for cells in m:
        os.system("clear")
        width = 10
        height = 10
        for y in range(height):
            for x in range(width):
                if m[Point(x, y)]:
                    put("x")
                else:
                    put("0")
                if x == width-1:
                    put("\n")
        time.sleep(0.2)


if __name__ == "__main__":
    main()
