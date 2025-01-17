let news = [
{
    text: "Scientists discover that typing faster actually burns more calories."
},
{
    text: "Breaking News: Local man types so fast, his keyboard starts smoking."
},
{
    text: "Study shows that typing with two fingers is 50% less efficient than using all ten."
},
{
    text: "New trend: Typing races becoming the latest e-sport sensation."
},
{
    text: "Typing tip: Always keep your wrists straight to avoid carpal tunnel syndrome."
},
{
    text: "Fun Fact: The quick brown fox jumps over the lazy dog uses every letter in the English alphabet."
},
{
    text: "Breaking: Typing competitions now offering scholarships for the fastest typists."
},
{
    text: "Did you know? The average person types between 38 and 40 words per minute."
},
{
    text: "Why don't keyboards ever sleep? Because they have two shifts."
},
{
    text: "Breaking News: New typing software claims to improve typing speed by 50%."
},
{
    text: "Fun Fact: The word 'typewriter' can be typed using only the top row of a QWERTY keyboard."
},
{
    text: "Tip: Practice typing regularly to improve your speed and accuracy."
},
{
    text: "What do you call a computer that sings? A-Dell."
},
{
    text: "Study: Typing games can help improve your typing speed and accuracy."
},
{
    text: "Tip: Maintain a proper posture to avoid strain while typing."
},
{
    text: "Why was the computer tired when it got home? It had a hard drive."
},
{
    text: "Fun Fact: The QWERTY keyboard layout was designed to prevent jamming on mechanical typewriters."
},
{
    text: "Tip: Take regular breaks to avoid fatigue while typing."
},
{
    text: "Why did the computer keep freezing? It left its Windows open."
},
{
    text: "Tip: Use a comfortable chair to maintain good posture while typing."
},
{
    text: "eBay is so useless. I tried to look up lighters and all they had was 13,749 matches."
},
{
    text: "I told my wife she should embrace her mistakes. She gave me a hug."
},
{
    text: "Why are computers like women? No one but the Creator understands their internal logic."
},
{
    text: "Why are computers like women? When something goes wrong, the error messages are just as descriptive."
},
{
    text: "Women are like internet domain names. The ones I like are already taken."
},
{
    text: "Why don't programmers like nature? It has too many bugs."
},
{
    text: "Why do Java developers wear glasses? Because they don't C#."
},
{
    text: "Why do programmers prefer dark mode? Because light attracts bugs."
},
{
    text: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings."
},
{
    text: "Why is a computer better than a girlfriend? You can turn it off when you're done with it."
}
]


let newsInit = false;
function displayNews() {
    if (newsInit) return;
    if(MagazinePublisher.level == 0) return;
    newsInit = true;
    document.getElementById("news-container").style.display = "flex";
    setInterval(() => {
        showNews();
    }, 1000 * 20);
    showNews();
}

function showNews() {
    const newsElement = document.getElementById("news-container").querySelector('.news-item');
    const newsContainer = document.getElementById("news-container");
    const currentNews = newsElement?.innerText || '';
    const newsIndex = Math.floor(Math.random() * news.length);
    const newNews = news[newsIndex].text;
    const isGoldenNews = Math.random() < (0.1 * (currentGuildTask === "publishing" ? 2 : 1)); // 10% base chance for golden news

    if (currentNews !== newNews) {
        if (newsElement) {
            newsElement.style.animationName = 'scrollDown'; // Animate the old news out
        }

        setTimeout(() => {
            if (newsElement) {
                newsContainer.removeChild(newsElement); // Remove old news
            }
            // Add new news
            const newNewsItem = document.createElement('span');
            newNewsItem.className = 'news-item';
            newNewsItem.style.animationName = 'scrollUp';
            newNewsItem.innerText = newNews;

            if (isGoldenNews) {
                newNewsItem.classList.add('golden-news');
                newNewsItem.addEventListener('click', () => {
                    if(newNewsItem.classList.contains('golden-news-clicked')) return;
                    playClickSound();
                    newNewsItem.classList.add('golden-news-clicked');
                    applyGoldenNewsBoost();
                    goldNewsClicks++;
                });
            }

            newsContainer.appendChild(newNewsItem);
        }, 1000);
    }
}

function applyGoldenNewsBoost() {
    const boostTypes = ['passive_boost', 'active_boost', 'keystrokes'];
    const boostType = boostTypes[Math.floor(Math.random() * boostTypes.length)];
    if (boostType === 'passive_boost') {
        spawnBoost(3);
        showNotification(`Golden News Boost`, '7x passive income for 1 minute!', 'url("images/boost/news.webp")');
    } else if (boostType === 'active_boost') {
        spawnBoost(4);
        showNotification(`Golden News Boost`, '7x production from manual keystrokes', 'url("images/boost/news.webp")');
    } else if (boostType === 'keystrokes') {
        // Grant instant keystrokes based on passive income
        const instantKeystrokes = getPassiveIncome() * 60 * 7; // 7 minute worth of passive income
        keystrokesBank += instantKeystrokes;
        showNotification(`Golden News Boost`, `+${formatShortScale(instantKeystrokes)} keystrokes!`, 'url("images/boost/news.webp")');
    }
}