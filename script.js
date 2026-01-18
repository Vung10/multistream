const input = document.getElementById("channelInput");
const addBtn = document.getElementById("addBtn");
const grid = document.getElementById("streamGrid");

addBtn.addEventListener("click", addStream);

function addStream() {
  const channel = input.value.trim().toLowerCase();
  if (!channel) return;

  const parentDomain = "vung10.github.io";

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

  grid.appendChild(stream);
  input.value = "";
  // Handle resize corner
grid.addEventListener('mousemove', (e) => {
  const stream = e.target.closest('.stream');
  if (stream) {
    const rect = stream.getBoundingClientRect();
    const isResizeCorner = 
      e.clientX > rect.right - 30 && 
      e.clientY > rect.bottom - 30;
    
    if (isResizeCorner) {
      stream.classList.add('resizing');
    } else {
      stream.classList.remove('resizing');
    }
  }
});

grid.addEventListener('mouseleave', () => {
  document.querySelectorAll('.stream.resizing').forEach(s => {
    s.classList.remove('resizing');
  });
});
}




