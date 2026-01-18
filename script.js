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
  
  // Position new streams offset from each other
  const existingStreams = grid.querySelectorAll('.stream-wrapper').length;
  wrapper.style.left = (20 + existingStreams * 30) + 'px';
  wrapper.style.top = (20 + existingStreams * 30) + 'px';
  
  // Create remove button
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = "×";
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    wrapper.remove();
  };
  
  // Create toggle chat mode button
  const toggleChatBtn = document.createElement("button");
  toggleChatBtn.className = "toggle-chat-btn";
  toggleChatBtn.innerHTML = "⇄";
  toggleChatBtn.title = "Toggle chat visibility";
  toggleChatBtn.onclick = (e) => {
    e.stopPropagation();
    const stream = wrapper.querySelector('.stream');
    const chatIframe = stream.querySelector('.chat-iframe');
    const resizer = stream.querySelector('.resizer');
    
    if (stream.classList.contains('chat-hidden')) {
      // Show chat
      stream.classList.remove('chat-hidden');
      chatIframe.style.display = 'block';
      resizer.style.display = 'block';
    } else {
      // Hide chat
      stream.classList.add('chat-hidden');
      chatIframe.style.display = 'none';
      resizer.style.display = 'none';
    }
  };
  
  // Create stream container inside
  const stream = document.createElement("div");
  stream.className = "stream";
  stream.innerHTML = `
    <iframe
      class="video-iframe"
      src="https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}"
      height="100%"
      width="100%"
      allowfullscreen>
    </iframe>
    <div class="resizer"></div>
    <iframe
      class="chat-iframe"
      src="https://www.twitch.tv/embed/${channel}/chat?parent=${parentDomain}&darkpopout"
      height="100%"
      width="100%">
    </iframe>
  `;
  
  wrapper.appendChild(removeBtn);
  wrapper.appendChild(toggleChatBtn);
  wrapper.appendChild(stream);
  grid.appendChild(wrapper);
  input.value = "";
  
  // Make it draggable
  makeDraggable(wrapper);
  
  // Make chat resizable
  makeResizable(stream);
}

// Drag functionality
function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  
  element.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    // Don't drag if clicking on resize handle area
    const rect = element.getBoundingClientRect();
    const isResizeArea = 
      e.clientX > rect.right - 20 && 
      e.clientY > rect.bottom - 20;
    
    if (isResizeArea) return;
    
    isDragging = true;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    
    // Disable iframe interaction while dragging
    element.querySelector('iframe').style.pointerEvents = 'none';
  }
  
  function elementDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    isDragging = false;
    document.onmouseup = null;
    document.onmousemove = null;
    
    // Re-enable iframe interaction
    element.querySelector('iframe').style.pointerEvents = 'auto';
  }
}
