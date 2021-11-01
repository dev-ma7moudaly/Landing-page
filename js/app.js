/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

//variable to know no of sections on page
let  lastSectionId =0;
//variable to catch ul that will contain list items
let navbar = document.querySelector('#navbar__list');
//variable to element that have id =scrollToTop, we will used to go to top page
const goToTopElement = document.getElementById('scrollToTop');
//variable to catch all sections on page
let sections = document.querySelectorAll('sections');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* function to add active class */
function addActiveClass(id){
  //add link active
  document.querySelector('.link_active')?.classList.remove('link_active'); //remove class from links
  document.querySelector(`[href="#${id}"]`).classList.add('link_active'); //add class to selected link

  //add section active
   document.querySelector('.your-active-class')?.classList.remove('your-active-class'); //remove class from sections
   document.querySelector(`#${id}`).classList.add('your-active-class'); //add class to selected section

  //update location hash
   setTimeout(() => {
      window.location.hash=id;
   }, 0);

};


/*function to goTo Top page */
function goToTop(){
  goToTopElement.addEventListener('click',()=>{
   window.scrollTo({
     top:0,behavior:`smooth`
   });
  });
};

/* function to check which section on screen */
function isSectionOnScreen(element,buffer){
  buffer = typeof buffer ==='undefined'? 0: buffer;

  //get element positions on viewport
  const bounding = element.getBoundingClientRect();

  //check if element on viewport
  if(bounding.top>=0 && bounding.left>=0 && bounding.right<= 
     ((window.innerWidth||document.documentElement.clientWidth) - buffer) && bounding.bottom <=
     ((window.innerHeight||document.documentElement.clientHeight) - buffer)
    ){
    return true;
  }else{
    return false;
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

//function to build navbar
function createNavbar(){
    //make ul is empty
    navbar.innerHTML ='';
    document.querySelectorAll('section').forEach(element=>{
        //add li beforeend on menu
        navbar.insertAdjacentHTML('beforeEnd',`<li><a href="#${element.id}" class="menu__link" data-section-id="${element.id}">${element.dataset.nav}</a></li>`);     
       });      
}

//function to remove last item on menu
function removeLastItem(){
    //variable to know no of items on menu
    let ItemsCount = document.querySelectorAll('li').length;
    //if there are items
    if(ItemsCount>0){
        document.querySelectorAll('li')[ItemsCount-1].remove();
    } 
}

//function to add new section
function AddNewSection(){
     lastSectionId+=1;
    let sectionContent=`<section id="section${lastSectionId}" data-nav="Section ${lastSectionId}" class="">
    <div class="landing__container">
      <h2>Section ${lastSectionId}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
    </section>`;

    let main =document.querySelectorAll('main')[0]; //select main
    main.insertAdjacentHTML('beforeend',sectionContent);//add section beforeend on main

    //we need to update navbar after we add section
    createNavbar(); 
}

//function to remove last Section
function RemoveLastSection(){
    let lastSection = document.querySelectorAll('section')[lastSectionId -1]; //know last section
    if(lastSectionId === 0){
        alert('no sections found,we can not remove sections');
    }else{
        //remove last section
        lastSection.remove();
       //decrement lastSection numbers
       lastSectionId-=1;
    }

    //we need to update navbar after we remove section
    removeLastItem();
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

/*on user scroll */
window.addEventListener('scroll',()=>{
  let scrollPercent =((window.innerHeight+window.scrollY)/document.body.offsetHeight)*100;
  if(scrollPercent > 40){
    goToTopElement.classList.remove('display__none');//show element
  }else{
    goToTopElement.classList.add('display__none'); //hide element
  }

  //update section active and menu link
  document.querySelectorAll('section').forEach(element=>{
    if(isSectionOnScreen(element, -200)){
       addActiveClass(element.id);
    }
  });
});

/*Event scroll smooth go to section */
  navbar.addEventListener('click',function(e){ //when click on menu
    e.preventDefault();//Prevent a link from opening the URL
    //scrolls the specified section into the visible area of the browser window
   document.getElementById(e.target.dataset.sectionId).scrollIntoView({behavior:`smooth`, block: `start`});
    addActiveClass(e.target.id);//call function add active class
  });


//build page
AddNewSection();
AddNewSection();
AddNewSection();
AddNewSection();
goToTop();

