
export default async function hander(req, res) {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({error:"City is required"});
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`);
        if (!response.ok) {
            if (response.status == 404) {
                return res.status(404).json({error:"City not found. Please enter a valid city name."})
            } else {
                return res.status(500).json({error:"Failed to fetch weather data. Please try again later."})
            }
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error:"Failed to fetch weather data"})
    }
}