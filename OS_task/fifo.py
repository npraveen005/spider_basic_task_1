class Process:
    def __init__(self, pid, arrival_time, burst_time):
        self.pid = pid
        self.arrival_time = arrival_time
        self.burst_time = burst_time
        self.completion_time = 0
        self.waiting_time = 0
        self.turnaround_time = 0

def fifo_scheduling(processes):
    current_time = 0
    total_waiting_time = 0
    total_turnaround_time = 0

    # Sort processes by arrival time
    processes.sort(key=lambda x: x.arrival_time)

    for process in processes:
        if current_time < process.arrival_time:
            current_time = process.arrival_time
        
        process.waiting_time = current_time - process.arrival_time
        process.completion_time = current_time + process.burst_time
        process.turnaround_time = process.completion_time - process.arrival_time
        
        current_time = process.completion_time
        
        total_waiting_time += process.waiting_time
        total_turnaround_time += process.turnaround_time

    avg_waiting_time = total_waiting_time / len(processes)
    avg_turnaround_time = total_turnaround_time / len(processes)

    return avg_waiting_time, avg_turnaround_time


processes = [
    Process(1, 0, 10),
    Process(2, 1, 5),
    Process(3, 3, 8),
    Process(4, 5, 2)
]

avg_waiting_time, avg_turnaround_time = fifo_scheduling(processes)

print(f"Average Waiting Time: {avg_waiting_time:.2f}")
print(f"Average Turnaround Time: {avg_turnaround_time:.2f}")

for process in processes:
    print(f"Process {process.pid}: Waiting Time = {process.waiting_time}, Turnaround Time = {process.turnaround_time}")