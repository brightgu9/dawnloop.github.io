document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");

    function loadContent(category) {
        if (category === 'resume') {
            mainContent.innerHTML = `
                <h2>Resume</h2>
                <p id="resume-display"></p>
                <textarea id="resume-content" style="display:none;" placeholder="여기에 나의 소개와 정보를 입력하세요..."></textarea><br>
                <button id="edit-resume">수정</button>
                <button id="save-resume" style="display:none;">저장</button>
            `;
            loadResume();
            setupResumeEvents();
        } else if (category === 'note') {
            mainContent.innerHTML = `
                <h2>Note</h2>
                <ul id="saved-note"></ul>
                <button id="new-note-post">글 작성</button>
            `;
            document.getElementById("new-note-post").addEventListener("click", showNoteForm);
            displayNotePosts();
        }
    }

    function loadResume() {
        const savedContent = localStorage.getItem("resumeContent") || "소개 내용을 작성해 주세요.";
        document.getElementById("resume-display").innerHTML = savedContent.replace(/\n/g, "<br>");
        document.getElementById("resume-content").value = savedContent;
    }

    function setupResumeEvents() {
        document.getElementById("edit-resume").addEventListener("click", function() {
            document.getElementById("resume-display").style.display = "none";
            document.getElementById("resume-content").style.display = "block";
            document.getElementById("edit-resume").style.display = "none";
            document.getElementById("save-resume").style.display = "inline";
        });
        document.getElementById("save-resume").addEventListener("click", function() {
            const content = document.getElementById("resume-content").value;
            localStorage.setItem("resumeContent", content);
            document.getElementById("resume-display").innerHTML = content.replace(/\n/g, "<br>");
            document.getElementById("resume-display").style.display = "block";
            document.getElementById("resume-content").style.display = "none";
            document.getElementById("edit-resume").style.display = "inline";
            document.getElementById("save-resume").style.display = "none";
        });
    }

    // Note 글 작성 폼 생성
    function showNoteForm(postIndex = null) {
        // 기존 폼 제거
        const existingForm = document.getElementById("note-form");
        if (existingForm) existingForm.remove();

        // 새 폼 생성
        mainContent.innerHTML += `
            <div id="note-form">
                <input type="text" id="note-title" placeholder="제목"><br>
                <textarea id="note-content" placeholder="내용을 작성하세요..."></textarea><br>
                <button id="save-note">저장</button>
                <button onclick="cancelNoteForm()">취소</button>
            </div>
        `;

        if (postIndex !== null) {
            const posts = JSON.parse(localStorage.getItem("note")) || [];
            document.getElementById("note-title").value = posts[postIndex].title;
            document.getElementById("note-content").value = posts[postIndex].content;
        }

        document.getElementById("save-note").addEventListener("click", function() {
            saveNotePost(postIndex);
        });
    }

    // Note 저장 기능
    function saveNotePost(postIndex = null) {
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem("note")) || [];
        if (postIndex === null) {
            posts.push({ title, content });
        } else {
            posts[postIndex] = { title, content };
        }
        localStorage.setItem("note", JSON.stringify(posts)); // 저장된 노트 업데이트
        loadContent('note'); // Note 목록으로 돌아가기
        displayNotePosts();  // Note 목록 표시
    }

    // Note 목록 불러오기
    function displayNotePosts() {
        const posts = JSON.parse(localStorage.getItem("note")) || [];
        const list = document.getElementById("saved-note");
        list.innerHTML = posts.map((post, index) => `
            <li>
                <strong>${post.title}</strong> - ${post.content}
                <button onclick="showNoteForm(${index})">수정</button>
                <button onclick="deleteNotePost(${index})">삭제</button>
            </li>
        `).join("");
    }

    // Note 삭제 기능
    function deleteNotePost(index) {
        const posts = JSON.parse(localStorage.getItem("note"));
        posts.splice(index, 1);
        localStorage.setItem("note", JSON.stringify(posts));
        displayNotePosts();
    }

    // Note 작성 취소
    function cancelNoteForm() {
        const form = document.getElementById("note-form");
        if (form) form.remove();
    }

    window.loadContent = loadContent;
    loadContent('resume'); // 처음 Resume 화면 로드
});
