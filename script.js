const input = document.getElementById("channelInput");
const addBtn = document.getElementById("addBtn");
const grid = document.getElementById("streamGrid");

addBtn.addEventListener("click", addStream);

function addStream() {
  const channel = input.value.trim().toLowerCase();
  if (!channel) return;
  const parentDomain = "vung10.github.io";
  
  // Create wrapper box
  const wrapper = document.createElement("div");
  wrapper.className = "stream-wrapper";
  
  // Create stream container inside
  const stream = document.createElement("div");
  stream.className = "stream";
  stream.innerHTML = `
    <iframe
      src="https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}"
      height="100%"
      width="100%"
      allowfullscreen>
    </iframe>
  `;
  
  wrapper.appendChild(stream);
  grid.appendChild(wrapper);
  input.value = "";
}
