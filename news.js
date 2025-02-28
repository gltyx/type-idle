let news = [
{
    text: "Scientists discover that typing faster actually burns more calories.",
    icon: "science"
},
{
    text: "Breaking News: Local man types so fast, his keyboard starts smoking.",
    icon: "breaking"
},
{
    text: "Study shows that typing with two fingers is 50% less efficient than using all ten.",
    icon: "study"
},
{
    text: "New trend: Typing races becoming the latest e-sport sensation.",
    icon: "trend"
},
{
    text: "Typing tip: Always keep your wrists straight to avoid carpal tunnel syndrome.",
    icon: "tip"
},
{
    text: "Fun Fact: The quick brown fox jumps over the lazy dog uses every letter in the English alphabet.",
    icon: "fact"
},
{
    text: "Breaking: Typing competitions now offering scholarships for the fastest typists.",
    icon: "breaking"
},
{
    text: "Did you know? The average person types between 38 and 40 words per minute.",
    icon: "fact"
},
{
    text: "Why don't keyboards ever sleep? Because they have two shifts.",
    icon: "joke"
},
{
    text: "Breaking News: New typing software claims to improve typing speed by 50%.",
    icon: "breaking"
},
{
    text: "Fun Fact: The word 'typewriter' can be typed using only the top row of a QWERTY keyboard.",
    icon: "fact"
},
{
    text: "Tip: Practice typing regularly to improve your speed and accuracy.",
    icon: "tip"
},
{
    text: "What do you call a computer that sings? A-Dell.",
    icon: "joke"
},
{
    text: "Study: Typing games can help improve your typing speed and accuracy.",
    icon: "study"
},
{
    text: "Tip: Maintain a proper posture to avoid strain while typing.",
    icon: "tip"
},
{
    text: "Why was the computer tired when it got home? It had a hard drive.",
    icon: "joke"
},
{
    text: "Fun Fact: The QWERTY keyboard layout was designed to prevent jamming on mechanical typewriters.",
    icon: "fact"
},
{
    text: "Tip: Take regular breaks to avoid fatigue while typing.",
    icon: "tip"
},
{
    text: "Why did the computer keep freezing? It left its Windows open.",
    icon: "joke"
},
{
    text: "Tip: Use a comfortable chair to maintain good posture while typing.",
    icon: "tip"
},
{
    text: "eBay is so useless. I tried to look up lighters and all they had was 13,749 matches.",
    icon: "joke"
},
{
    text: "I told my wife she should embrace her mistakes. She gave me a hug.",
    icon: "joke"
},
{
    text: "Why are computers like women? No one but the Creator understands their internal logic.",
    icon: "joke"
},
{
    text: "Why are computers like women? When something goes wrong, the error messages are just as descriptive.",
    icon: "joke"
},
{
    text: "Women are like internet domain names. The ones I like are already taken.",
    icon: "joke"
},
{
    text: "Why don't programmers like nature? It has too many bugs.",
    icon: "joke"
},
{
    text: "Why do Java developers wear glasses? Because they don't C#.",
    icon: "joke"
},
{
    text: "Why do programmers prefer dark mode? Because light attracts bugs.",
    icon: "joke"
},
{
    text: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    icon: "joke"
},
{
    text: "Why is a computer better than a girlfriend? You can turn it off when you're done with it.",
    icon: "joke"
}
]

const newsIcons = {
    breaking: "📰",
    tip: "💡",
    joke: "😄",
    fact: "🔍",
    study: "📚",
    trend: "📈",
    science: "🔬"
};

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
    const currentNews = newsElement?.querySelector('.news-text')?.innerText || '';
    const newsIndex = Math.floor(Math.random() * news.length);
    const newNews = news[newsIndex].text;
    const newsIcon = news[newsIndex].icon || "fact";
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
            const newNewsItem = document.createElement('div');
            newNewsItem.className = 'news-item';
            newNewsItem.style.animationName = 'scrollUp';

            // Create the icon element
            const iconSpan = document.createElement('span');
            iconSpan.className = 'news-icon';
            iconSpan.textContent = newsIcons[newsIcon] || newsIcons.fact;
            
            // Create the text element
            const textSpan = document.createElement('span');
            textSpan.className = 'news-text';
            textSpan.innerText = newNews;

            // Add the icon and text to the news item
            newNewsItem.appendChild(iconSpan);
            newNewsItem.appendChild(textSpan);

            if (isGoldenNews) {
                textSpan.classList.add('golden-news');
                textSpan.addEventListener('click', () => {
                    if(textSpan.classList.contains('golden-news-clicked')) return;
                    playClickSound();
                    textSpan.classList.remove('golden-news');
                    textSpan.classList.add('golden-news-clicked');
                    applyGoldenNewsBoost();
                    goldNewsClicks++;
                    gtag('event', 'gold_news_click', {
                        'event_category': 'news',
                        'total_clicks': goldNewsClicks
                      });
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
        showNotification(`Golden News Boost`, '7x passive income for 1 minute!', 'url("/images/boost/news.webp")');
    } else if (boostType === 'active_boost') {
        spawnBoost(4);
        showNotification(`Golden News Boost`, '7x production from manual keystrokes', 'url("/images/boost/news.webp")');
    } else if (boostType === 'keystrokes') {
        // Grant instant keystrokes based on passive income
        const instantKeystrokes = getPassiveIncome() * 60 * 7; // 7 minute worth of passive income
        keystrokesBank += instantKeystrokes;
        showNotification(`Golden News Boost`, `+${formatShortScale(instantKeystrokes)} keystrokes!`, 'url("/images/boost/news.webp")');
    }
}