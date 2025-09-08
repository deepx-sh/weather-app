
export default async function hander(req, res) {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({error:"City is required"});
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error:"Failed to fetch weather data"})
    }
}