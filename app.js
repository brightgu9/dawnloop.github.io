document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("main-content");

    function loadContent(category) {
        switch (category) {
            case 'resume':
                mainContent.innerHTML = `
                    <h2>Resume</h2>
                    <p id="resume-display"></p>
                    <textarea id="resume-content" style="display:none;" placeholder="여기에 나의 소개와 정보를 입력하세요..."></textarea><br>
                    <button id="edit-resume">수정</button>
                    <button id="save-resume" style="display:none;">저장</button>
                `;
                loadResume();
                setupResumeEvents();
                break;
            case 'note':
                mainContent.innerHTML = `
                    <h2>Note</h2>
                    <ul id="saved-note"></ul>
                    <button id="new-note-post">글 작성</button>
                `;
                document.getElementById("new-note-post").addEventListener("click", showEditForm); // 글 작성 버튼 연결
                displayNotePosts();
                break;
            default:
                mainContent.innerHTML = `<p>존재하지 않는 카테고리입니다.</p>`;
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

    window.loadContent = loadContent;
    loadContent('resume');
});
