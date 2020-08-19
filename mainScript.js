const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", function(){
    const songName = document.getElementById('songName').value;
    // console.log(songName);
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => showSearchResult(data.data.slice(0, 10)))
    .catch(error => console.log(error));
})

function showSearchResult(data){
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = "";
    searchResult.classList.add("search-result", "col-md-8", "mx-auto", "py-4")
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const title = element.title;
        const artist = element.artist.name;
        const album = element.album.title;
        const albumCover = element.album.cover_small;
        const artistCover = element.artist.picture_small;
        const child = ` <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <div class="d-flex">
                                    <img class="mr-2 rounded-circle" style="height: 40px" src="${albumCover}" alt="Album Cover">
                                    <h3 class="lyrics-name">${title}</h3>
                                </div>
                                <div class="d-flex"
                                    <p class="author lead">Album: ${album} by: <span> ${artist}</span></p>
                                    <img class="ml-2 rounded-circle" style="height: 20px" src="${artistCover}" alt="Artist Cover">
                                </div>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics('${title}', '${artist}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`;
        searchResult.innerHTML += child;
    }
}

function getLyrics(title, artist){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const showLyrics = document.getElementById('showLyrics');
        const songLyrics = `<button class="btn go-back">&lsaquo;</button>
                        <h2 class="text-success mb-4">${title} - ${artist}</h2>
                        <pre class="lyric text-white">
${data.lyrics}
                        </pre>`;
        const lyricsFailed = `<h2 class="text-danger mb-4">${data.error}</h2>`
        if(data.error){
            showLyrics.innerHTML = lyricsFailed;
        } else {
            showLyrics.innerHTML = songLyrics;
        }
    })
    .catch(error => console.log(error));
}