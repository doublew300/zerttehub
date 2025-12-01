export const countryCodes: Record<string, string> = {
    'Турция': 'tr', 'Turkey': 'tr', 'TR': 'tr',
    'Чехия': 'cz', 'Czech Republic': 'cz', 'CZ': 'cz',
    'Венгрия': 'hu', 'Hungary': 'hu', 'HU': 'hu',
    'Польша': 'pl', 'Poland': 'pl', 'PL': 'pl',
    'Германия': 'de', 'Germany': 'de', 'DE': 'de',
    'Италия': 'it', 'Italy': 'it', 'IT': 'it',
    'Китай': 'cn', 'China': 'cn', 'CN': 'cn',
    'Корея': 'kr', 'South Korea': 'kr', 'KR': 'kr',
    'Казахстан': 'kz', 'Kazakhstan': 'kz', 'KZ': 'kz',
    'США': 'us', 'USA': 'us', 'US': 'us',
    'Великобритания': 'gb', 'UK': 'gb', 'GB': 'gb',
    'Канада': 'ca', 'Canada': 'ca', 'CA': 'ca',
    'Австралия': 'au', 'Australia': 'au', 'AU': 'au',
    'Нидерланды': 'nl', 'Netherlands': 'nl', 'NL': 'nl',
    'Франция': 'fr', 'France': 'fr', 'FR': 'fr',
    'Швейцария': 'ch', 'Switzerland': 'ch', 'CH': 'ch',
    'Сингапур': 'sg', 'Singapore': 'sg', 'SG': 'sg',
    'Япония': 'jp', 'Japan': 'jp', 'JP': 'jp',
    'Гонконг': 'hk', 'Hong Kong': 'hk', 'HK': 'hk',
}

export const getCountryCode = (country: string) => {
    if (!country) return null
    for (const key in countryCodes) {
        if (country.includes(key)) return countryCodes[key]
    }
    return null
}
