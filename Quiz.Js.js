
"use strict";

// 登録された問題
const quizzes = [
    {
        question: "日本の首都はどこ？",
        choices: ["大阪", "東京", "京都", "名古屋"],
        correctAnswer: "東京"
    },
    {
        question: "1 + 1 の答えは？",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "2"
    },
    {
        question: "地球が太陽の周りを1周する時間は？",
        choices: ["約1日", "約1か月", "約1年", "約10年"],
        correctAnswer: "約1年"
    },
    {
        question: "単位時間あたりに導線の断面を通過する電荷量で表される物理量は？",
        choices: ["電位", "電子素量", "抵抗", "電流"],
        correctAnswer: "電流"
    }
];

// 出題順を管理する変数
let questionOrder = [];
let currentIndex = 0;
let correctCount = 0;

// 配列をランダムな順番に並べ替える関数
function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// クイズ開始ボタン
document.getElementById("start-quiz").addEventListener("click", function () {

    // 問題が登録されていない場合
    if (quizzes.length === 0) {
        alert("問題が登録されていません。");
        return;
    }

    // 問題番号をランダムな順番にする
    questionOrder = shuffle(
        quizzes.map((quiz, index) => index)
    );

    // カウンターを初期化
    currentIndex = 0;
    correctCount = 0;

    // ホーム画面を隠してクイズ画面を表示
    document.getElementById("home").hidden = true;
    document.getElementById("result-screen").hidden = true;
    document.getElementById("quiz-screen").hidden = false;

    // 最初の問題を表示
    showCurrentQuiz();
});

// 現在の問題を表示する関数
function showCurrentQuiz() {

    // 出題順に従って問題を取得
    const quiz = quizzes[questionOrder[currentIndex]];

    // 現在の問題番号を表示
    document.getElementById("question-number").textContent =
        `問題 ${currentIndex + 1} / ${questionOrder.length}`;

    // 問題文を表示
    document.getElementById("question").textContent = quiz.question;

    // 選択肢をいったん削除
    const choicesArea = document.getElementById("choices");
    choicesArea.innerHTML = "";

    /// 選択肢をランダムな順番に並べ替える
    const shuffledChoices = shuffle(quiz.choices);

    // ランダムな順番で選択肢を作成する
    shuffledChoices.forEach(function (choice) {

    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "answer";
    radio.value = choice;
    radio.required = true;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice));

    choicesArea.appendChild(label);
    choicesArea.appendChild(document.createElement("br"));
    });
}

// 回答ボタンを押したときの処理
document.getElementById("quiz-form").addEventListener("submit", function (event) {

    // フォーム送信によるページ再読み込みを防止
    event.preventDefault();

    // 現在の問題を取得
    const quiz = quizzes[questionOrder[currentIndex]];

    // 選択された回答を取得
    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    // 正解なら正解数を加算
    if (selected.value === quiz.correctAnswer) {
    correctCount++;
}

    // 次の問題へ進む
    currentIndex++;

    if (currentIndex < questionOrder.length) {

        // 次の問題を表示
        showCurrentQuiz();

    } else {

        // 全問終了したら結果画面を表示
        document.getElementById("quiz-screen").hidden = true;
        document.getElementById("result-screen").hidden = false;

        document.getElementById("final-result").textContent =
            `${questionOrder.length}問中 ${correctCount}問正解！`;
    }
});

// ホームに戻るボタン
document.getElementById("back-home").addEventListener("click", function () {

    document.getElementById("result-screen").hidden = true;
    document.getElementById("home").hidden = false;

});
