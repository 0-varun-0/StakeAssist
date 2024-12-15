// Load polls and votes from localStorage
let polls = JSON.parse(localStorage.getItem("polls")) || [];
let votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || [];

function renderPolls() {
    const container = document.getElementById("polls-container");
    container.innerHTML = ""; // Clear existing polls

    polls.forEach((poll, index) => {
        const pollCard = document.createElement("div");
        pollCard.className = "poll-card";
        pollCard.innerHTML = `
            <div class="poll-header">${poll.question}</div>
            <div class="poll-options">
                <button onclick="vote(${index}, 'up')">Upvote</button>
                <button onclick="vote(${index}, 'down')">Downvote</button>
                <div class="votes">Upvotes: ${poll.upvotes} | Downvotes: ${poll.downvotes}</div>
            </div>
            ${poll.voted ? `<div class="voted-message">You have already voted</div>` : ''}
        `;
        container.appendChild(pollCard);
    });
}

// Add a new poll
function addPoll() {
    const pollQuestion = document.getElementById("poll-question").value;
    if (pollQuestion.trim() === "") {
        alert("Poll question cannot be empty.");
        return;
    }

    const newPoll = {
        question: pollQuestion,
        upvotes: 0,
        downvotes: 0,
        voted: false
    };

    polls.push(newPoll);
    localStorage.setItem("polls", JSON.stringify(polls));
    document.getElementById("poll-question").value = ''; // Clear input field
    renderPolls();
}

// Handle voting
function vote(pollIndex, voteType) {
    if (votedPolls.includes(pollIndex)) {
        alert("You have already voted on this poll.");
        return;
    }

    const poll = polls[pollIndex];
    if (voteType === "up") {
        poll.upvotes++;
    } else if (voteType === "down") {
        poll.downvotes++;
    }

    poll.voted = true;
    votedPolls.push(pollIndex);

    // Save updated poll and vote state to localStorage
    localStorage.setItem("polls", JSON.stringify(polls));
    localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

    renderPolls();
}

// Initial render
renderPolls();
