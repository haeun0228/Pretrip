let today = new Date(); //오늘 날짜
let date = new Date();

// 일정 데이터
const schedules = [
  { date: "2024-07-03", spot: "전주" },
  { date: "2024-07-04", spot: "전주" },
  { date: "2024-07-05", spot: "전주" },
  { date: "2024-07-06", spot: "전주" },
  { date: "2024-07-16", spot: "대전" },
  { date: "2024-07-17", spot: "대전" },
  { date: "2024-07-28", spot: "강릉" },
  { date: "2024-07-29", spot: "강릉" },
  { date: "2024-07-30", spot: "강릉" },
  { date: "2024-08-09", spot: "부산" },
  { date: "2024-08-10", spot: "부산" },
  { date: "2024-08-11", spot: "부산" },
  { date: "2024-08-12", spot: "부산" },
  { date: "2024-08-13", spot: "부산" },
  { date: "2024-10-10", spot: "제주도" },
  { date: "2024-10-11", spot: "제주도" },
  { date: "2024-10-12", spot: "제주도" },
  { date: "2024-10-13", spot: "제주도" },
  { date: "2024-10-14", spot: "제주도" },
  { date: "2024-10-15", spot: "제주도" },
  { date: "2024-10-16", spot: "제주도" },
  { date: "2024-10-17", spot: "제주도" },
  { date: "2024-10-18", spot: "제주도" },

];


//여행지 데이터 받아오기
// const schedules = [];
// export async function getMySchedules() {
//   const res = await fetch(``);
//   if (!res.ok) {
//     throw new Error('데이터를 불러오는데 실패했습니다.');
//   }
//   const data = await res.json();
//   return data;
// }

// async function fetchMySchedules() {
//   try {
//     schedules = await getMySchedules();
//   } catch (error) {
//     throw new Error('데이터를 불러오는데 실패했습니다.');
//   }
// }



//이전달
function beforem() {
  //이전 달을 today에 값을 저장
  today = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  autoReload(); //만들기
}

//다음달
function nextm() {
  //다음 달을 today에 저장
  today = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  autoReload();
}

//오늘 선택
function thisMonth() {
  today = new Date();
  autoReload();
}

function autoReload() {
  let nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
  let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
  let tbcal = document.getElementById("calendar"); // 테이블 달력을 만들 테이블
  let yearmonth = document.getElementById("yearmonth"); //  년도와 월 출력할곳
  yearmonth.innerHTML =
    today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; //년도와 월 출력

  if (today.getMonth() + 1 == 12) {
    //  눌렀을 때 월이 넘어가는 곳
    before.innerHTML = "<";
    next.innerHTML = "1월" + ">";
  } else if (today.getMonth() + 1 == 1) {
    //  1월 일 때
    before.innerHTML = "<" + "12월";
    next.innerHTML = today.getMonth() + 2 + "월" + ">";
  } //   12월 일 때
  else {
    before.innerHTML = "<" + today.getMonth() + "월";
    next.innerHTML = today.getMonth() + 2 + "월" + ">";
  }

  // 남은 테이블 줄 삭제
  while (tbcal.rows.length > 2) {
    tbcal.deleteRow(tbcal.rows.length - 1);
  }
  var row = null;
  row = tbcal.insertRow();
  var cnt = 0;
  var dayCheck = nMonth.getDay() == 0 ? 7 : nMonth.getDay(); //일요일을 마지막으로 넣기 위해서.

  // 1일 시작칸 찾기
  for (i = 0; i < dayCheck - 1; i++) {
    cnt = cnt + 1; //요일값
    cell = row.insertCell();
  }

  // 달력 출력
  for (
    i = 1;
    i <= lastDate.getDate();
    i++ // 1일부터 마지막 일까지
  ) {
    cell = row.insertCell();

    var str = "";

    str += "<div>" + i + "</div>";
    var day = i < 10 ? "0" + i : i;
    str += "<div id='" + day + "'></div>"; //나중에 원하는 날에 일정을 넣기위해 id값을 날자로 설정
    cell.innerHTML = str;

    cnt = cnt + 1;
    if (cnt % 7 == 6) {
      //토요일
      var str = "";
      str += "<div>" + i + "</div>";
      var day = i < 10 ? "0" + i : i;
      str += "<div id='" + day + "'>";
      str += "</div>";
      cell.innerHTML = str;
      cell.style.color = "#009de0";
    }
    if (cnt % 7 == 0) {
      //일요일
      var str = "";
      str += "<div>" + i + "</div>";
      var day = i < 10 ? "0" + i : i;
      str += "<div id='" + day + "'>";
      str += "</div>";
      cell.innerHTML = str;
      row = calendar.insertRow(); // 줄 추가
      cell.style.color = "#ed5353";
    }

    //마지막 날짜가 지나면 일요일까지 칸 그리기
    if (lastDate.getDate() == i && cnt % 7 != 0) {
      var add = 7 - (cnt % 7);
      for (var k = 1; k <= add; k++) {
        cell = row.insertCell();
        cnt = cnt + 1;
      }
    }

    //오늘 날짜 표시
    // if (
    //   today.getFullYear() == date.getFullYear() &&
    //   today.getMonth() == date.getMonth() &&
    //   i == date.getDate()
    // ) {
    //   cell.style.border = "dotted 2px #1E90FF";
    // }

    // 일정에 대한 색상 매핑
    const dateColor = [
      "#fdc8e9",
      "#f8f2b4",
      "#cdf3d3",
      "#fddac8",
      "#ddc5fb",
      "#bffcfa",
    ];
    const spotColorMap = {}; // spot별 색상 매핑
    let colorIndex = 0;

    // 일정 있는 날짜 배경색 변경
    const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day}`;

    schedules.forEach((schedule) => {
      // spot에 대한 색상 매핑이 없으면 새로운 색상 할당
      if (!spotColorMap[schedule.spot]) {
        spotColorMap[schedule.spot] =
          dateColor[colorIndex % dateColor.length];
        colorIndex++;
      }

      // 해당 날짜의 일정이 있는 경우 색상 적용
      if (schedule.date === dateStr) {
        cell.style.backgroundColor = spotColorMap[schedule.spot];
      }
    });

    //마지막 날짜가 지나면 일요일까지 칸 그리기
    if (lastDate.getDate() == i && cnt % 7 != 0) {
      var add = 7 - (cnt % 7);
      for (var k = 1; k <= add; k++) {
        cell = row.insertCell();
        cnt = cnt + 1;
      }
    }

    // 일정 위치 정보 출력
    const spotList = [...new Set(schedules.map((item) => item.spot))];
    const spotInfo = document.getElementById("spot");
    spotInfo.innerHTML = ""; // 이전의 내용을 지웁니다.

    spotList.forEach((item) => {
      const p = document.createElement("p");

      // 색상과 텍스트를 HTML 문자열로 설정
      const color = spotColorMap[item];
      p.innerHTML = `■ <span style="color: black;">${item}</span>`;

      // 배경색을 spotColorMap[item]으로 설정
      p.style.color = color;

      spotInfo.appendChild(p);
    });
  }

  //원하는 날짜 영역에 일정 추가하기
  // let backColor = [];
  // var tdId = "01"; //1일
  // var str = "";
  // str += "<br>09:00 일정1";
  // str += "<br>12:00 일정2 \n";
  // document.getElementById(tdId).innerHTML = str;
}
