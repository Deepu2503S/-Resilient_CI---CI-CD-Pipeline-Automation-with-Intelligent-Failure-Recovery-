import numpy as np
import time

if __name__ == "__main__":

    # ============================================================
    # TEST 1 — LOGIC ERROR (Uncommented to test line numbers!)
    # ============================================================
    data = [1, 2, 3, 4, 5]
    result = np.mean(data) 
    


    # ============================================================
    # TEST 2 — SYNTAX ERROR (commented)
    # ============================================================
    # def calculate(:
    #     return 42
    # calculate()


    # ============================================================
    # TEST 3 — DEPENDENCY ERROR (commented)
    # ============================================================
    # import some_random_package_that_doesnt_exist
    # some_random_package_that_doesnt_exist.run()


    # ============================================================
    # TEST 4 — ENVIRONMENT ERROR (commented)
    # ============================================================
    # with open("/etc/shadow", "r") as f:
    #     print(f.read())


    # ============================================================
    # TEST 5 — TIMEOUT ERROR (commented)
    # ============================================================
    # time.sleep(9999)


    # ============================================================
    # TEST 6 — UNKNOWN ERROR (commented)
    # ============================================================
    #raise Exception("Something catastrophically weird happened at runtime")