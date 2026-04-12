import numpy as np

def calculate():
    data = [1, 2, 3, 4, 5]
    result = np.mean(data)
    
    # This will crash — TypeError
    total = result + "hundred"
    return total

if __name__ == "__main__":
    print("Starting calculation...")
    calculate()