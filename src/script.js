document.getElementById('btn').addEventListener('click', async () => {
    try {
        const response = await fetch('api.php');
        const data = await response.text();
        document.getElementById('result').innerText = data;
    } catch (error) {
        document.getElementById('result').innerText = 'Error calling PHP API';
        console.error(error);
    }
});
