#!/usr/bin/env python3
from base import Point, Cell, Rule

def area_lifenum(area):
    num = 0
    for x in area:
        s = set(x)
        if None in s:
            s.remove(None)
        num += len(s)
    return num


def lifegame_next(matrix):
    new = {}
    for point, cell in matrix.cells.items():
        sub = matrix.get_area(point, 1)
        for x, line in enumerate(sub):
            for y, cell in enumerate(line):
                abspoint = Point(point.x+x-1, point.y+y-1)
                num = area_lifenum(matrix.get_area(abspoint, 1))
                if cell:
                    num -= 1
                if num == 3 or (cell and num==2):
                    new[abspoint] = Cell(abspoint, True)
    return new


def lifegame_init(matrix):
    matrix.put(Cell(Point(0, 1), True))
    matrix.put(Cell(Point(1, 1), True))
    matrix.put(Cell(Point(2, 1), True))

rule = Rule(lifegame_init, lifegame_next)
