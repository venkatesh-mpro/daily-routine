const routine = [
    {
        "name": "Hair routine",
        "time": 5,
        "occurance": 1
    },
    {
        "name": "Lift weight",
        "time": 30,
        "occurance": 1
    },
    {
        "name": "S H W",
        "time": 30,
        "occurance": 3
    },
    {
        "name": "Signature prep",
        "time": 30,
        "occurance": 1
    }
];

const startDate = new Date(2024, 10, 3, 0, 0, 0);

const now = new Date();

const differenceInMilliseconds = now - startDate;

const millisecondsInADay = 1000 * 60 * 60 * 24;
const differenceInDays = Math.round(differenceInMilliseconds / millisecondsInADay);

const block = []
for (const rout of routine){
    if ((differenceInDays % rout["occurance"]) == 0) {
        block.push(rout)
    }
}

let currentRoutineIndex = 0;
let timer;
let isPaused = false;

function displayRoutine() {
    const routineList = document.getElementById("routineList");
    routineList.innerHTML = '<h2>Routine Schedule</h2><button id="playPauseButton" onclick="pauseResumeRoutine()">▶️</button><button onclick="skipRoutine()">Skip</button><br><br>';
    

    block.forEach((item, index) => {
        const routineDiv = document.createElement("div");
        routineDiv.className = "routine-block";
        routineDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Time:</strong> ${item.time}m</p>
            <div class="controls">
                <span id="timer-${index}">Time Remaining: 00:00</span><br><br>
                <button onclick="startRoutine(${index})">Start</button>
            </div>
        `;
        routineList.appendChild(routineDiv);
    });
}

function startRoutine(index) {
    if (timer) clearInterval(timer);
    currentRoutineIndex = index;
    isPaused = false;

    let duration = block[index].time * 60;
    const timerDisplay = document.getElementById(`timer-${index}`);

    timer = setInterval(() => {
        if (!isPaused) {
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            timerDisplay.textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (duration <= 0) {
                clearInterval(timer);
                alert(`${block[index].name} is complete!`);
                skipRoutine();
            } else {
                duration--;
            }
        }
    }, 1000);
}

function pauseResumeRoutine() {
    isPaused = !isPaused;
    const playPauseButton = document.getElementById("playPauseButton");
    playPauseButton.textContent = isPaused ? "▶️" : "⏸️";
}

function skipRoutine() {
    if (timer) clearInterval(timer);
    currentRoutineIndex++;
    if (currentRoutineIndex < block.length) {
        startRoutine(currentRoutineIndex);
    } else {
        alert("All routines are complete!");
    }
}

displayRoutine();