class Dog:
    def __init__(self, name: str ,age : int):
        self.name = name
        self.age = age
    def bark(self,):
        return f'a {self.age} years old dog, {self.name} barks at the man!'

name = input('what is the name of the dog\n')
age = int(input('what is the age of the dog\n'))

d = Dog(name , age)
print(d.bark())

# to call function use bracket like d.bark()
# to call a variable with out bracket like :- d.name or d.age
