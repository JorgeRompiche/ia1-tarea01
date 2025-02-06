function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function ensuciar(states) {
    if (Math.random() < 0.3) states[1] = "DIRTY";
    if (Math.random() < 0.3) states[2] = "DIRTY";
}

let visited_states = new Set();

function test(states) {
    var location = states[0];
    var location_state = location == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, location_state);

    let state_key = states.join("_");
    visited_states.add(state_key);

    document.getElementById("log")
        .innerHTML += "<br>[ ".concat(location)
            .concat(" | ").concat(states[1])
            .concat(" | ").concat(states[2])
            .concat(" ] => Action: ").concat(action_result)
        ;

    if (action_result == "CLEAN") {
        if (location == "A") {
            states[1] = "CLEAN";
        }
        else if (location == "B") {
            states[2] = "CLEAN";
        }
    } else if (action_result == "RIGHT") {
        states[0] = "B";
    } else if (action_result == "LEFT") {
        states[0] = "A";
    }

    ensuciar(states);

    if (visited_states.size >= 8) {
        document.getElementById("log").innerHTML += "<br>Se han visitado los 8 estados.";
        document.getElementById("log").innerHTML += "<br>" + Array.from(visited_states).join(", ");
        return;
    }

    setTimeout(function () { test(states); }, 2000);
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);
