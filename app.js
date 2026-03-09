const templates = {
    'follow-up': {
        subject: (points) => `Following up${points[0] ? ' — ' + points[0] : ''}`,
        greeting: (name) => `Hi ${name},`,
        opener: () => {
            const openers = [
                "Hope you're doing well. Just wanted to follow up on our recent conversation.",
                "Thanks for your time recently. I wanted to circle back on a few things.",
                "Good to connect with you. Following up on what we discussed."
            ];
            return openers[Math.floor(Math.random() * openers.length)];
        },
        closer: () => "Let me know if you have any questions or want to discuss further.",
        signoff: (name) => `Best,\n${name}`
    },
    'cold-outreach': {
        subject: (points) => `Quick question${points[0] ? ' about ' + points[0].toLowerCase() : ''}`,
        greeting: (name) => `Hi ${name},`,
        opener: () => {
            const openers = [
                "I came across your company and thought I'd reach out.",
                "I hope you don't mind me getting in touch directly.",
                "I know you're busy, so I'll keep this short."
            ];
            return openers[Math.floor(Math.random() * openers.length)];
        },
        closer: () => "Would it make sense to have a quick chat about this? Happy to work around your schedule.",
        signoff: (name) => `Cheers,\n${name}`
    },
    'thank-you': {
        subject: (points) => `Thank you${points[0] ? ' — ' + points[0] : ''}`,
        greeting: (name) => `Hi ${name},`,
        opener: () => {
            const openers = [
                "Just wanted to say a proper thank you.",
                "I really appreciate what you've done and wanted to say thanks.",
                "Wanted to drop you a quick note to say thank you."
            ];
            return openers[Math.floor(Math.random() * openers.length)];
        },
        closer: () => "Thanks again — it really means a lot.",
        signoff: (name) => `All the best,\n${name}`
    },
    'complaint': {
        subject: (points) => `Issue with ${points[0] ? points[0].toLowerCase() : 'your service'}`,
        greeting: (name) => `Dear ${name},`,
        opener: () => {
            const openers = [
                "I'm writing to raise an issue I've been experiencing.",
                "I need to bring something to your attention.",
                "I'm getting in touch about a problem I've encountered."
            ];
            return openers[Math.floor(Math.random() * openers.length)];
        },
        closer: () => "I'd appreciate it if you could look into this and get back to me as soon as possible.",
        signoff: (name) => `Regards,\n${name}`
    },
    'introduction': {
        subject: (points) => `Introduction${points[0] ? ' — ' + points[0] : ''}`,
        greeting: (name) => `Hi ${name},`,
        opener: () => {
            const openers = [
                "I wanted to introduce myself and explain a bit about what I do.",
                "Great to connect with you. Let me tell you a bit about myself.",
                "I thought I'd drop you a note to introduce myself."
            ];
            return openers[Math.floor(Math.random() * openers.length)];
        },
        closer: () => "I'd love to learn more about what you do as well. Perhaps we could connect for a quick chat sometime?",
        signoff: (name) => `Looking forward to hearing from you,\n${name}`
    },
    'meeting-request': {
        subject: (points) => `Meeting request${points[0] ? ' — ' + points[0] : ''}`,
        greeting: (name) => `Hi ${name},`,
        opener: () => {
            const openers = [
                "I'd like to set up a time for us to meet and discuss a few things.",
                "Would you have some time this week or next for a quick meeting?",
                "I was hoping we could find a time to chat about something."
            ];
            return openers[Math.floor(Math.random() * openers.length)];
        },
        closer: () => "Would any time this week or next work for you? I'm pretty flexible — happy to fit around your diary.",
        signoff: (name) => `Best,\n${name}`
    }
};

function generateEmail() {
    const type = document.getElementById('emailType').value;
    const recipient = document.getElementById('recipientName').value.trim() || 'there';
    const sender = document.getElementById('senderName').value.trim() || '[Your Name]';
    const customSubject = document.getElementById('subject').value.trim();
    const bulletText = document.getElementById('bulletPoints').value.trim();

    if (!bulletText) {
        alert('Please enter at least one bullet point.');
        return;
    }

    const points = bulletText.split('\n').map(p => p.replace(/^[-•*]\s*/, '').trim()).filter(p => p);
    const template = templates[type];

    // Build subject
    const subject = customSubject || template.subject(points);

    // Build body
    const body = points.map(point => {
        // Capitalise first letter and add period if missing
        let sentence = point.charAt(0).toUpperCase() + point.slice(1);
        if (!/[.!?]$/.test(sentence)) sentence += '.';
        return sentence;
    }).join('\n\n');

    const email = `${template.greeting(recipient)}

${template.opener()}

${body}

${template.closer()}

${template.signoff(sender)}`;

    document.getElementById('subjectLine').textContent = `Subject: ${subject}`;
    document.getElementById('emailOutput').textContent = email;
    document.getElementById('output').style.display = 'block';
    document.getElementById('output').scrollIntoView({ behavior: 'smooth' });
}

function copyEmail() {
    const subject = document.getElementById('subjectLine').textContent;
    const body = document.getElementById('emailOutput').textContent;
    const full = subject + '\n\n' + body;

    navigator.clipboard.writeText(full).then(() => {
        const msg = document.getElementById('copyMsg');
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 2000);
    });
}
