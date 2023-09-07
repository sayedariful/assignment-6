// "https://openapi.programming-hero.com/api/videos/categories"
let cardContainer = document.getElementById("card-container");
let idContainer = null;
// ===================== main api function ===============
const handleAllCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick="handleLoadVideo('${category.category_id}')" class="tab  btn  btn-accent">${category.category}</a>
        `;
    tabContainer.appendChild(div);
  });
};
handleAllCategory();

// ===================================== hand load video item display =====================
const handleLoadVideo = async (categoryId = "1000") => {
  idContainer = categoryId;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  cardContainer.innerHTML = "";

  data.data.forEach((videos) => {
    let accountVarified = videos.authors[0]?.verified;
    let accountVarifiedVarible = null;

    // ------------------ card ar post time function  ------------
    let postDateVarible = null;
    let sec = videos.others?.posted_date;
    let secConvert = parseFloat(sec);
    if (!isNaN(secConvert)) {
      let minite = sec % 3600;
      let miniteOrigin = minite / 60;
      let miniteParese = Math.floor(miniteOrigin);
      let hour = sec / 60 / 60;
      let hourParse = Math.floor(hour);
      // console.log(miniteParese);
      postDateVarible = `
        <div class="p-1 px-2 rounded bg-slate-600 text-white">
          ${hourParse}hr ${miniteParese} min ago
        </div>
      `;
    } else {
      postDateVarible = "";
    }
    // console.log(secConvert);

    // ------------------ account varified img ------------
    if (accountVarified) {
      accountVarifiedVarible = `
      <img src="image/varified.png">
    `;
    } else {
      accountVarifiedVarible = "";
    }
    // console.log(accountVarifiedVarible);
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-white shadow-xl">
                      <!-------------- card img --------------->
                    <div class="relative ">
                      <figure>
                          <img class="inline-block rounded-md h-[250px] object-cover w-full" 
                          src=${videos?.thumbnail} />
                      </figure>
                      <div class="absolute bottom-3 w-full flex   justify-end pr-2 ">
                         ${postDateVarible}
                      </div>
                  </div><!-------------- card img --------------->

                      <div class="card-body">
                          <!-------------- title img --------------->
                          <div class="flex">
                              <figure class="pr-3">
                                  <img class="rounded-full object-cover block w-10 h-10" src=${videos?.authors?.[0].profile_picture} />
                              </figure>
                              <h2 class="card-title">${videos?.authors?.[0].profile_name}</h2>
                          </div><!-------------- title img --------------->

                          <!-------------- Awlad Hossain --------------->
                          <div class="mt-4 pl-2">
                              <div class="flex">
                                  <div class="flex">
                                      <p class="inline">${videos?.title}</p>
                                      <figure>
                                      ${accountVarifiedVarible}
                                      </figure>
                                  </div>
                              </div>
                              <p class="mt-2">${videos?.others.views}</p>
                          </div><!-------------- Awlad Hossain --------------->
                      </div>
                  </div>
      `;
    cardContainer.appendChild(div);
  });
  if (data.data.length == 0) {
    let div = document.createElement("div");
    div.classList = `col-span-12 w-full flex flex-col py-10
    gap-5 justify-center items-center`;
    div.innerHTML = `
    <div class=" ">
    <figure class="flex justify-center items-center">
    <img src="image/Icon.png" alt="">
    </figure>
    <p class="text-4xl  mt-6  text-center font-semibold">
    Oops!! Sorry, <br> There is no content here
    </p>
    </div> 
    `;
    cardContainer.appendChild(div);
    // console.log("data data t kkjkj");
  }
};
handleLoadVideo();
// --------------------------------- item sort  -----------------------------------------------
let counter = 0;
async function handleShort() {
  counter++;
  let response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${idContainer}`
  );
  let data = await response.json();
  // console.log(data.data);
  let itemsort = data.data.sort((x, y) => {
    let item1 = x.others?.views;
    let item2 = y.others?.views;
    let item1Length = item1.length;
    let item2Length = item2.length;

    let item1Slice = item1.slice(0, item1Length - 1);
    let item2Slice = item2.slice(0, item2Length - 1);
    let result = item2Slice - item1Slice;
    // console.log(result, counter);
    return result;
  });
  // console.log(itemsort);
  cardContainer.innerHTML = "";
  // --------------------- sort by views item -----------------
  // ------------------------------------------------------------
  itemsort.forEach((videos) => {
    let accountVarified = videos.authors[0]?.verified;
    let accountVarifiedVarible = null;

    // ------------------ card ar post time function  ------------
    let postDateVarible = null;
    let sec = videos.others?.posted_date;
    let secConvert = parseFloat(sec);
    if (!isNaN(secConvert)) {
      let minite = sec % 3600;
      let miniteOrigin = minite / 60;
      let miniteParese = Math.floor(miniteOrigin);
      let hour = sec / 60 / 60;
      let hourParse = Math.floor(hour);
      // console.log(miniteParese);
      postDateVarible = `
        <div class="p-1 px-2 rounded bg-slate-600 text-white">
          ${hourParse}hr ${miniteParese} min ago
        </div>
      `;
    } else {
      postDateVarible = "";
    }
    // console.log(secConvert);

    // ------------------ account varified img ------------
    if (accountVarified) {
      accountVarifiedVarible = `
      <img src="image/varified.png">
    `;
    } else {
      accountVarifiedVarible = "";
    }
    // console.log(accountVarifiedVarible);
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="card bg-white shadow-xl">
                      <!-------------- card img --------------->
                    <div class="relative ">
                      <figure>
                          <img class="inline-block h-[250px] object-cover w-ful" 
                          src=${videos?.thumbnail} />
                        </figure>
                      <div class="absolute bottom-3 w-full flex justify-end pr-2 ">
                         ${postDateVarible}
                      </div>
                  </div><!-------------- card img --------------->

                        <div class="card-body">
                            <!-------------- title img --------------->
                                <div>
                                    <figure class="pr-3">
                                      <img class="rounded-full object-cover block w-10 h-10" src=${videos?.authors?.[0].profile_picture} />
                                    </figure>
                                    <h2 class="card-title">${videos?.authors?.[0].profile_name}</h2>
                                </div><!-------------- title img --------------->

                                <!-------------- Awlad Hossain --------------->
                                <div class="mt-4 pl-2">
                                  <div class="flex">
                                    <div class="flex">
                                      <p class="inline">${videos?.title}</p>
                                      <figure>
                                      ${accountVarifiedVarible}
                                      </figure>
                                    </div>
                                  </div>
                                  <p class="mt-2">views: ${videos?.others.views}</p>
                              </div><!-------------- Awlad Hossain --------------->
                    </div>
          </div>
      `;
    cardContainer.appendChild(div);
  });
  if (data.data.length == 0) {
    let div = document.createElement("div");
    div.classList = `col-span-12 w-full flex flex-col py-10
    gap-5 justify-center items-center`;
    div.innerHTML = `
    <div class=" ">
    <figure class="flex justify-center items-center">
    <img src="image/Icon.png" alt="">
    </figure>
    <p class="text-4xl  mt-6  text-center font-semibold">
    Oops!! Sorry, <br> There is no content here
    </p>
    </div> 
    `;
    cardContainer.appendChild(div);
    // console.log("data data t kkjkj");
  }
}
// handleShort()
