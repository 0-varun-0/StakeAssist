document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    const pollCards = document.querySelectorAll('.poll-card');

    pollCards.forEach(card => {
        card.addEventListener('click', () => {
            const pollId = card.dataset.id;
            showPollOptions(pollId, card);
        });
    });

    function showPollOptions(pollId, card) {
        const options = `
            <div class="poll-options">
                <p>Rate your choice:</p>
                <button onclick="submitPoll(${pollId}, 'Excellent', this)">Excellent</button>
                <button onclick="submitPoll(${pollId}, 'Good', this)">Good</button>
                <button onclick="submitPoll(${pollId}, 'Average', this)">Average</button>
                <button onclick="submitPoll(${pollId}, 'Poor', this)">Poor</button>
            </div>
        `;
        card.innerHTML = options;
    }

    window.submitPoll = (pollId, choice, button) => {
        button.closest('.poll-card').classList.add('hidden');
        showToast();
        alert(`Successfully submitted your response: ${choice}`);
        setTimeout(() => button.closest('.poll-card').remove(), 500);
    };

    function showToast() {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2000);
    }
});
