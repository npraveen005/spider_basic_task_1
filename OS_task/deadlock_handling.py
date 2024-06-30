class Process:
    def __init__(self, pid, allocated, max_need):
        self.pid = pid
        self.allocated = allocated
        self.max_need = max_need
        self.need = [max_need[i] - allocated[i] for i in range(len(allocated))]

def is_safe_state(processes, available):
    work = available.copy()
    finish = [False] * len(processes)
    
    while True:
        found = False
        for i, process in enumerate(processes):
            if not finish[i] and all(process.need[j] <= work[j] for j in range(len(work))):
                work = [work[j] + process.allocated[j] for j in range(len(work))]
                finish[i] = True
                found = True
                break
        
        if not found:
            break
    
    return all(finish)

def detect_deadlock(processes, available):
    if is_safe_state(processes, available):
        print("No deadlock detected. The system is in a safe state.")
    else:
        print("Potential deadlock detected. The system is in an unsafe state.")

processes = [
    Process(0, [0, 1, 0], [7, 5, 3]),
    Process(1, [2, 0, 0], [3, 2, 2]),
    Process(2, [3, 0, 2], [9, 0, 2]),
    Process(3, [2, 1, 1], [2, 2, 2]),
    Process(4, [0, 0, 2], [4, 3, 3])
]

available = [3, 3, 2]

detect_deadlock(processes, available)