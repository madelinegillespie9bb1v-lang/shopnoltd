let currentReceiver = null;

function loadChat() {
  $.post("chat_api.php", { action: "fetch", receiver_id: currentReceiver }, function (data) {
    let msgs = JSON.parse(data || "[]");
    $("#chatBox").html(msgs.map(m => `<div><b>${m.username || ''}</b>: ${m.message}</div>`).join(''));
  });
}

function loadFeed() {
  $.post("feed_api.php", { action: "fetch" }, function (data) {
    let posts = JSON.parse(data || "[]");
    $("#feedBox").html(posts.map(p => `
      <div class='mb-2 border-bottom pb-2'>
        <b>${p.username}</b>: ${p.content}
        <div class='small text-muted'>❤ ${p.likes} 💬 ${p.comments}</div>
        <button class='btn btn-sm btn-outline-danger likeBtn' data-id='${p.id}'>Like</button>
      </div>`).join(''));
  });
}

$(document).on("click", ".user-item", function(){
  currentReceiver = $(this).data("id");
  loadChat();
});

$("#sendMsg").click(function(){
  let msg = $("#message").val().trim();
  if(!msg) return;
  $.post("chat_api.php", { action:"send", message:msg, receiver_id:currentReceiver }, function(){
    $("#message").val("");
    loadChat();
  });
});

$("#postBtn").click(function(){
  let content = $("#postContent").val().trim();
  if(!content) return;
  $.post("feed_api.php", { action:"post", content }, function(){
    $("#postContent").val("");
    loadFeed();
  });
});

$(document).on("click", ".likeBtn", function(){
  let id = $(this).data("id");
  $.post("feed_api.php", { action:"like", post_id:id }, loadFeed);
});

// auto-refresh every 5s
setInterval(() => {
  if (currentReceiver) loadChat();
  loadFeed();
}, 5000);

$(document).ready(() => {
  loadFeed();
});
