from inheritance2 import Student
class call_from_another_component(Student):
    pass

p = call_from_another_component()
print(p.name) # Abenezer
print(p.age)  # 50000
print(p.gread) # 1