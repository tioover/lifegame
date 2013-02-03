import collections
Point = collections.namedtuple("Point", ["x", "y"])
Cell = collections.namedtuple("Cell", ["point", "value"])

class Rule():
    def __init__(self, init, deduction):
        self.init = init
        self.deduction = deduction
