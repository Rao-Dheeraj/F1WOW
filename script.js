// FormulaNews - F1wow Website Script

// F1 API Endpoints - Primary and backup
const API_BASE = 'https://jolpica-f1.vercel.app/api/f1';
const ERGAST_API = 'https://ergast.com/api/f1';
const CURRENT_YEAR = 2026;

// Team color mapping (2026 teams)
const teamColors = {
    'Red Bull Racing': 'team-redbull',
    'Ferrari': 'team-ferrari',
    'Mercedes': 'team-mercedes',
    'McLaren': 'team-mclaren',
    'Aston Martin': 'team-astonmartin',
    'Alpine': 'team-alpine',
    'Williams': 'team-williams',
    'RB': 'team-alphatauri',
    'Racing Bulls': 'team-alphatauri',
    'AlphaTauri': 'team-alphatauri',
    'Alfa Romeo': 'team-alfaromeo',
    'Kick Sauber': 'team-alfaromeo',
    'Sauber': 'team-alfaromeo',
    'Audi': 'team-alfaromeo',
    'Haas F1 Team': 'team-haas',
    'Haas': 'team-haas',
    'Cadillac': 'team-haas'
};

// Team logo URLs (2026 teams)
const teamLogos = {
    'Red Bull Racing': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Red_Bull_Racing_logo.svg',
    'Ferrari': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Scuderia_Ferrari_Logo.svg',
    'Mercedes': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Mercedes-AMG-Logo.svg',
    'McLaren': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/McLaren_Racing_logo.svg',
    'Aston Martin': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Aston_Martin_F1_logo.svg',
    'Alpine': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Alpine_F1_team_logo.svg',
    'Williams': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Williams_Racing_logo.svg',
    'RB': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Visa_Cash_App_RB_F1_team_logo.svg',
    'Racing Bulls': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Visa_Cash_App_RB_F1_team_logo.svg',
    'AlphaTauri': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Visa_Cash_App_RB_F1_team_logo.svg',
    'Sauber': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Stake_F1_Team_logo.svg',
    'Audi': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Audi_logo.svg',
    'Haas F1 Team': 'https://upload.wikimedia.org/wikipedia/commons/1/16/Moneygram_Haas_F1_logo.svg',
    'Haas': 'https://upload.wikimedia.org/wikipedia/commons/1/16/Moneygram_Haas_F1_logo.svg',
    'Cadillac': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Cadillac_logo.svg/svg'
};

// Fallback logo if not found
const fallbackLogo = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Stake_F1_Team_logo.svg';

// 2026 Race Calendar
const RACE_SCHEDULE_2026 = [
    { round: 1, name: 'Australia', location: 'Melbourne', date: 'Mar 6-8', completed: true, winner: 'George Russell', sprint: false },
    { round: 2, name: 'China', location: 'Shanghai', date: 'Mar 13-15', completed: true, winner: 'Kimi Antonelli', sprintWinner: 'George Russell' },
    { round: 3, name: 'Japan', location: 'Suzuka', date: 'Mar 27-29', completed: false, next: true, sprint: false },
    { round: 4, name: 'Bahrain', location: 'Sakhir', date: 'Apr 10-12', completed: false, cancelled: true },
    { round: 5, name: 'Saudi Arabia', location: 'Jeddah', date: 'Apr 17-19', completed: false, cancelled: true },
    { round: 6, name: 'Miami', location: 'Miami', date: 'May 1-3', completed: false },
    { round: 7, name: 'Canada', location: 'Montreal', date: 'May 22-24', completed: false },
    { round: 8, name: 'Monaco', location: 'Monte Carlo', date: 'Jun 5-7', completed: false },
    { round: 9, name: 'Spain', location: 'Barcelona', date: 'Jun 12-14', completed: false },
    { round: 10, name: 'Austria', location: 'Spielberg', date: 'Jun 26-28', completed: false },
    { round: 11, name: 'Great Britain', location: 'Silverstone', date: 'Jul 3-5', completed: false },
    { round: 12, name: 'Belgium', location: 'Spa', date: 'Jul 17-19', completed: false },
    { round: 13, name: 'Hungary', location: 'Budapest', date: 'Jul 24-26', completed: false },
    { round: 14, name: 'Netherlands', location: 'Zandvoort', date: 'Aug 21-23', completed: false },
    { round: 15, name: 'Italy', location: 'Monza', date: 'Sep 4-6', completed: false },
    { round: 16, name: 'Spain', location: 'Madrid', date: 'Sep 11-13', completed: false },
    { round: 17, name: 'Azerbaijan', location: 'Baku', date: 'Sep 24-26', completed: false },
    { round: 18, name: 'Singapore', location: 'Marina Bay', date: 'Oct 9-11', completed: false },
    { round: 19, name: 'United States', location: 'Austin', date: 'Oct 23-25', completed: false },
    { round: 20, name: 'Mexico', location: 'Mexico City', date: 'Oct 30 - Nov 1', completed: false },
    { round: 21, name: 'Brazil', location: 'São Paulo', date: 'Nov 6-8', completed: false },
    { round: 22, name: 'Las Vegas', location: 'Las Vegas', date: 'Nov 19-21', completed: false },
    { round: 23, name: 'Qatar', location: 'Lusail', date: 'Nov 27-29', completed: false },
    { round: 24, name: 'Abu Dhabi', location: 'Yas Marina', date: 'Dec 4-6', completed: false }
];

// 2026 Grid Helper
const GRID_2026 = {
    drivers: [
        { pos: 1, name: 'Max Verstappen', team: 'Red Bull Racing' },
        { pos: 2, name: 'Lando Norris', team: 'McLaren' },
        { pos: 3, name: 'Charles Leclerc', team: 'Ferrari' },
        { pos: 4, name: 'Oscar Piastri', team: 'McLaren' },
        { pos: 5, name: 'Lewis Hamilton', team: 'Ferrari' },
        { pos: 6, name: 'George Russell', team: 'Mercedes' },
        { pos: 7, name: 'Kimi Antonelli', team: 'Mercedes' },
        { pos: 8, name: 'Carlos Sainz', team: 'Williams' },
        { pos: 9, name: 'Fernando Alonso', team: 'Aston Martin' },
        { pos: 10, name: 'Lance Stroll', team: 'Aston Martin' },
        { pos: 11, name: 'Yuki Tsunoda', team: 'RB' },
        { pos: 12, name: 'Liam Lawson', team: 'RB' },
        { pos: 13, name: 'Pierre Gasly', team: 'Alpine' },
        { pos: 14, name: 'Jack Doohan', team: 'Alpine' },
        { pos: 15, name: 'Alex Albon', team: 'Williams' },
        { pos: 16, name: 'Nico Hulkenberg', team: 'Sauber' },
        { pos: 17, name: 'Gabriel Bortoleto', team: 'Sauber' },
        { pos: 18, name: 'Esteban Ocon', team: 'Haas' },
        { pos: 19, name: 'Oliver Bearman', team: 'Haas' },
        { pos: 20, name: 'Isack Hadjar', team: 'RB' }
    ],
    constructors: [
        { pos: 1, name: 'McLaren' },
        { pos: 2, name: 'Ferrari' },
        { pos: 3, name: 'Red Bull Racing' },
        { pos: 4, name: 'Mercedes' },
        { pos: 5, name: 'Aston Martin' },
        { pos: 6, name: 'Williams' },
        { pos: 7, name: 'RB' },
        { pos: 8, name: 'Alpine' },
        { pos: 9, name: 'Sauber' },
        { pos: 10, name: 'Haas' }
    ]
};

// Constructor name mapping
const constructorMapping = {
    'red_bull': 'Red Bull Racing',
    'ferrari': 'Ferrari',
    'mercedes': 'Mercedes',
    'mclaren': 'McLaren',
    'aston_martin': 'Aston Martin',
    'alpine': 'Alpine',
    'williams': 'Williams',
    'rb': 'RB',
    'alphatauri': 'AlphaTauri',
    'alfa': 'Alfa Romeo',
    'kick_sauber': 'Kick Sauber',
    'sauber': 'Sauber',
    'haas': 'Haas F1 Team'
};

// Fetch driver standings
async function fetchDriverStandings() {
    const container = document.getElementById('driverStandings');
    try {
        const response = await fetch(`${API_BASE}/${CURRENT_YEAR}/driverStandings.json`);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();

        const standings = data?.mrData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
        if (!standings) {
            throw new Error('Invalid data structure');
        }

        displayDriverStandings(standings);
    } catch (error) {
        console.error('Error fetching driver standings:', error);
        displayFallbackStandings(container, 'driver');
    }
}

// Display driver standings
function displayDriverStandings(standings) {
    const container = document.getElementById('driverStandings');
    const html = standings.map(driver => {
        const teamName = driver.Constructors?.[0]?.name || 'Unknown';
        const logoUrl = teamLogos[teamName] || fallbackLogo;

        return `
            <div class="standing-item">
                <div class="standing-position">${driver.position}</div>
                <div class="team-logo">
                    <img src="${logoUrl}" alt="${teamName}" onerror="this.src='${fallbackLogo}'">
                </div>
                <div class="standing-info">
                    <div>
                        <div class="standing-name">${driver.Driver.givenName} ${driver.Driver.familyName}</div>
                        <div style="font-size: 0.75rem; color: var(--f1-light-gray);">${teamName}</div>
                    </div>
                </div>
                <div class="standing-points">${driver.points} pts</div>
            </div>
        `;
    }).join('');
    container.innerHTML = html;
}

// Fetch constructor standings
async function fetchConstructorStandings() {
    const container = document.getElementById('constructorStandings');
    try {
        const response = await fetch(`${API_BASE}/${CURRENT_YEAR}/constructorStandings.json`);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();

        const standings = data?.mrData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings;
        if (!standings) {
            throw new Error('Invalid data structure');
        }

        displayConstructorStandings(standings);
    } catch (error) {
        console.error('Error fetching constructor standings:', error);
        displayFallbackStandings(container, 'constructor');
    }
}

// Display constructor standings
function displayConstructorStandings(standings) {
    const container = document.getElementById('constructorStandings');
    const html = standings.map(team => {
        const logoUrl = teamLogos[team.Constructor.name] || fallbackLogo;

        return `
            <div class="standing-item">
                <div class="standing-position">${team.position}</div>
                <div class="team-logo">
                    <img src="${logoUrl}" alt="${team.Constructor.name}" onerror="this.src='${fallbackLogo}'">
                </div>
                <div class="standing-info">
                    <div class="standing-name">${team.Constructor.name}</div>
                </div>
                <div class="standing-points">${team.points} pts</div>
            </div>
        `;
    }).join('');
    container.innerHTML = html;
}

// Fallback standings when API fails - Official 2026 standings after China GP (including Sprint)
// Australia GP Results (Race only, no sprint): 1.Russell 25, 2.Antonelli 18, 3.Leclerc 15, 4.Hamilton 12, 5.Norris 10, 6.Piastri 8, 7.Verstappen 6, 8.Sainz 4, 9.Albon 2, 10.Alonso 1
// China GP Sprint Results: 1.Russell 8, 2.Antonelli 7, 3.Norris 6, 4.Leclerc 5, 5.Hamilton 4, 6.Verstappen 3, 7.Piastri 2, 8.Sainz 1
// China GP Race Results: 1.Antonelli 25, 2.Russell 18, 3.Hamilton 15, 4.Norris 10, 5.Piastri 8, 6.Leclerc 6, 7.Hulkenberg 4, 8.Ocon 2, 9.Bearman 1
function displayFallbackStandings(container, type) {
    const fallbackData = {
        driver: [
            { position: 1, name: 'George Russell', team: 'Mercedes', points: 51 },
            { position: 2, name: 'Kimi Antonelli', team: 'Mercedes', points: 47 },
            { position: 3, name: 'Charles Leclerc', team: 'Ferrari', points: 34 },
            { position: 4, name: 'Lewis Hamilton', team: 'Ferrari', points: 33 },
            { position: 5, name: 'Oliver Bearman', team: 'Haas F1 Team', points: 17 },
            { position: 6, name: 'Lando Norris', team: 'McLaren', points: 15 },
            { position: 7, name: 'Pierre Gasly', team: 'Alpine', points: 9 },
            { position: 8, name: 'Max Verstappen', team: 'Red Bull Racing', points: 8 },
            { position: 9, name: 'Liam Lawson', team: 'Racing Bulls', points: 8 },
            { position: 10, name: 'Arvid Lindblad', team: 'Racing Bulls', points: 4 },
            { position: 11, name: 'Isack Hadjar', team: 'Red Bull Racing', points: 4 },
            { position: 12, name: 'Oscar Piastri', team: 'McLaren', points: 3 },
            { position: 13, name: 'Carlos Sainz', team: 'Williams', points: 2 },
            { position: 14, name: 'Gabriel Bortoleto', team: 'Audi', points: 2 },
            { position: 15, name: 'Franco Colapinto', team: 'Alpine', points: 1 },
            { position: 16, name: 'Esteban Ocon', team: 'Haas F1 Team', points: 0 },
            { position: 17, name: 'Nico Hulkenberg', team: 'Audi', points: 0 },
            { position: 18, name: 'Alexander Albon', team: 'Williams', points: 0 },
            { position: 19, name: 'Valtteri Bottas', team: 'Cadillac', points: 0 },
            { position: 20, name: 'Sergio Perez', team: 'Cadillac', points: 0 },
            { position: 21, name: 'Fernando Alonso', team: 'Aston Martin', points: 0 },
            { position: 22, name: 'Lance Stroll', team: 'Aston Martin', points: 0 }
        ],
        constructor: [
            { position: 1, name: 'Mercedes', points: 98 },
            { position: 2, name: 'Ferrari', points: 67 },
            { position: 3, name: 'McLaren', points: 18 },
            { position: 4, name: 'Haas F1 Team', points: 17 },
            { position: 5, name: 'Red Bull Racing', points: 12 },
            { position: 6, name: 'Racing Bulls', points: 12 },
            { position: 7, name: 'Alpine', points: 10 },
            { position: 8, name: 'Audi', points: 2 },
            { position: 9, name: 'Williams', points: 2 },
            { position: 10, name: 'Cadillac', points: 0 },
            { position: 11, name: 'Aston Martin', points: 0 }
        ]
    };

    const data = fallbackData[type];
    const html = data.map(item => {
        const logoUrl = teamLogos[item.team] || teamLogos[item.name] || fallbackLogo;
        const displayTeam = type === 'driver' ? item.team : '';

        return `
            <div class="standing-item">
                <div class="standing-position">${item.position}</div>
                <div class="team-logo">
                    <img src="${logoUrl}" alt="${item.team}" onerror="this.src='${fallbackLogo}'">
                </div>
                <div class="standing-info">
                    <div>
                        <div class="standing-name">${item.name}</div>
                        ${displayTeam ? `<div style="font-size: 0.75rem; color: var(--f1-light-gray);">${displayTeam}</div>` : ''}
                    </div>
                </div>
                <div class="standing-points">${item.points} pts</div>
            </div>
        `;
    }).join('');

    container.innerHTML = html + `
        <div style="padding: 15px 25px; font-size: 0.75rem; color: var(--f1-red); font-style: italic; text-align: center;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 5px;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Updated: After Chinese GP 2026 (includes Sprint results)
        </div>
    `;
}

// Load and display race schedule
function loadRaceSchedule() {
    const container = document.getElementById('raceSchedule');
    if (!container) return;

    const html = RACE_SCHEDULE_2026.map(race => {
        let statusClass = '';
        let badgeClass = '';
        let badgeText = '';

        if (race.cancelled) {
            statusClass = 'cancelled';
            badgeClass = 'cancelled';
            badgeText = 'CANCELLED';
        } else if (race.completed) {
            statusClass = 'completed';
            badgeClass = 'completed';
            if (race.sprintWinner && race.winner) {
                badgeText = `Sprint: ${race.sprintWinner} | Race: ${race.winner}`;
            } else if (race.winner) {
                badgeText = `Winner: ${race.winner}`;
            } else {
                badgeText = 'Completed';
            }
        } else if (race.next) {
            statusClass = 'next-race';
            badgeClass = 'next';
            badgeText = 'NEXT RACE';
        } else {
            statusClass = 'upcoming';
            badgeClass = 'upcoming';
            badgeText = 'Round ' + race.round;
        }

        const clickAction = race.completed ? `href="${race.name.toLowerCase().replace(' ', '-')}-gp.html"` : '';

        return `
            <a ${clickAction} class="race-card ${statusClass}" ${!clickAction ? 'style="cursor: default;"' : ''}>
                <div class="race-round">R${race.round}</div>
                <div class="race-info">
                    <div class="race-name">${race.name} GP</div>
                    <div class="race-date">${race.date}</div>
                </div>
                <span class="race-badge ${badgeClass}">${badgeText}</span>
            </a>
        `;
    }).join('');

    container.innerHTML = html;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchDriverStandings();
    fetchConstructorStandings();
    loadRaceSchedule();
    fetchInstagramFollowers();
    startCountdown();
    initPredictor();
});

// Championship Predictor
function initPredictor() {
    const buttons = document.querySelectorAll('.predictor-btn');
    const resultsSection = document.getElementById('predictorResults');
    const predictionBars = document.getElementById('predictionBars');

    // Load saved predictions from localStorage
    const savedPredictions = JSON.parse(localStorage.getItem('f1Predictions') || '{}');

    buttons.forEach(btn => {
        const driver = btn.dataset.driver;

        // Show previously voted state
        if (savedPredictions[driver]) {
            btn.classList.add('selected');
        }

        btn.addEventListener('click', () => {
            // Toggle selection
            btn.classList.toggle('selected');

            // Update predictions
            if (btn.classList.contains('selected')) {
                savedPredictions[driver] = true;
            } else {
                delete savedPredictions[driver];
            }

            localStorage.setItem('f1Predictions', JSON.stringify(savedPredictions));
            showPredictions(savedPredictions);
        });
    });

    // Show results if there are any predictions
    if (Object.keys(savedPredictions).length > 0) {
        showPredictions(savedPredictions);
    }

    function showPredictions(predictions) {
        const driverNames = {
            'max': 'Max Verstappen',
            'leclerc': 'Charles Leclerc',
            'hamilton': 'Lewis Hamilton',
            'russell': 'George Russell',
            'norris': 'Lando Norris',
            'antonelli': 'Kimi Antonelli'
        };

        resultsSection.style.display = 'block';
        predictionBars.innerHTML = '';

        const total = Object.keys(predictions).length;
        if (total === 0) {
            resultsSection.style.display = 'none';
            return;
        }

        Object.keys(predictions).forEach(driver => {
            const percentage = Math.round((1 / total) * 100);
            const bar = document.createElement('div');
            bar.className = 'prediction-bar';
            bar.innerHTML = `
                <div class="prediction-bar-label">${driverNames[driver]}</div>
                <div class="prediction-bar-track">
                    <div class="prediction-bar-fill" style="width: ${percentage}%">${percentage}%</div>
                </div>
            `;
            predictionBars.appendChild(bar);
        });
    }
}

// Countdown Timer for Next Race (Japanese GP 2026 - March 27-29)
function startCountdown() {
    // Japanese GP 2026 date (March 29, 2026)
    const raceDate = new Date('2026-03-29T06:00:00Z').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = raceDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div class="hero-badge">🏁 Race Weekend Underway!</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Fetch Instagram follower count for @f1wow
async function fetchInstagramFollowers() {
    const followerElement = document.getElementById('followerCount');
    if (!followerElement) return;

    // Using a free API to get Instagram followers
    // Note: For production, you may need to use Instagram Basic Display API
    const username = 'f1wow';

    try {
        // Using an alternative API approach
        const response = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const followers = data?.graphql?.user?.edge_followed_by?.count;
            if (followers) {
                updateFollowerCount(followers);
                return;
            }
        }
    } catch (error) {
        console.log('Primary API failed, trying backup...');
    }

    // Backup: Use a counter service or set manual value
    // For now, set a base count that increments
    updateFollowerCount(132500);
}

function updateFollowerCount(count) {
    const followerElement = document.getElementById('followerCount');
    if (!followerElement) return;

    // Animate the count
    const targetCount = parseInt(count);
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        if (step >= steps) {
            current = targetCount;
            clearInterval(timer);
        }
        followerElement.textContent = formatNumber(Math.floor(current));
    }, duration / steps);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
