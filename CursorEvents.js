AFRAME.registerComponent("cursor-listener", {
    schema:{
        selectedItemId:{default:"",type:"string"}
    },

    init: function () {
     this.handleClickEvents();
     this.handleMouseEnterEvents();
     this.handleMouseLeaveEvents();
    },

    handleClickEvents:function(){
        this.el.addEventListener("click",evt=>{
            const placesContainer=document.querySelector("#places-container")
            const {state}=placesContainer.getAttribute("tour")
            if(state==="places-list"){
                const id=this.el.getAttribute("id")
                const placesId=["basement","outside","living_room"]
                if(placesId.includes(id)){
                    placesContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard:id
                    })
                }
            }
            if(state==="view"){
                this.handleViewState()
            }
            if(state==="change-view"){
                this.handleViewState()
            }
            
        })
    },

    handleViewState:function(){
        const el=this.el
        const id=el.getAttribute("id")
        const placesContainer=document.querySelector("#places-container")
        const {selectedItemId}=placesContainer.getAttribute("cursor-listener")
        const sideViewPlacesId=["place-1","place-2","place-3"]
        if(sideViewPlacesId.includes(id)){
            placesContainer.setAttribute("tour",{
                stage:"change-view"
            })
            const skyEl=document.querySelector("#main-container")
            skyEl.setAttribute("material",{color:"white", src:`./assets/${selectedItemId}/${id}.jpg`})

        }
    },

    handlePlacesListState:function(){
        const id=this.el.getAttribute("id")
        const placesId=["living_room","basement","outside"]
        if(placesId.includes(id)){
            const placeContainer=document.querySelector("#places-container")
            placeContainer.setAttribute("cursor-listener",{selectedItemId:id})
            this.el.setAttribute("material",{opacity:1,color:"yellow"})
        }
    },

    handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlacesListState();
        })
    },
    
    handleMouseLeaveEvents:function(){
        this.el.addEventListener("mouseleave",()=>{
            const{selectedItemId}=this.data
            if(selectedItemId){
                const el=document.querySelector(`#${selectedItemId}`)
                const id=el.getAttribute("id");
                if(id==selectedItemId){
                    el.setAttribute("material",{opacity:1,color:"red"})
                }
            }
        })
    },

    
})