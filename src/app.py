import sys
import random

def divide_numbers(a, b):
    return a / b

def read_file(filename):
    with open(filename, "r") as f:
        return f.read()

def unstable_function():
    if random.choice([True, False]):
        raise RuntimeError("Random failure occurred in unstable function")

def main():
    print("Starting Resilient_CI demo application")
    if len(sys.argv) > 1 and sys.argv[1] == "divide":
        print("Running division test")
        result = divide_numbers(10, 0)  
        print("Result:", result)

    elif len(sys.argv) > 1 and sys.argv[1] == "file":
        print("Running file read test")
        content = read_file("non_existent_file.txt")  
        print(content)

    elif len(sys.argv) > 1 and sys.argv[1] == "random":
        print("Running unstable function")
        unstable_function()
        print("Unstable function succeeded!")

    else:
        print("App ran successfully with no failure trigger.")

if __name__ == "__main__":
    main()
