export class Search {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchInput.addEventListener('keyup', this.debounseReposetories(this.searcReposetories.bind(this), 500));
        this.selectList = document.querySelector('.selectList');
        this.includeList = document.querySelector('.includeList');
        this.counter = 0;
    }

    async searcReposetories() {
        if (this.searchInput.value) {
            return await fetch(`https://api.github.com/search/repositories?q=${this.searchInput.value}&per_page=5`)
                .then((response) => {
                    if (response.ok) {
                        response.json().then(response => {
                            response.items.forEach(reposetories => {
                                this.createValue(reposetories)
                            })
                        })
                    } else {

                    }
                })
        } else {
            this.clearList();
        }
    }

    createValue(reposetories) {
        if(this.counter <=5){
            this.options = document.createElement('div');
            this.options.classList.add("options");
            this.options.append(reposetories.name);
            this.options.addEventListener('click', () => {
                this.createListItem(reposetories.name, reposetories.owner.login, reposetories.stargazers_count);
            });
            this.selectList.append(this.options)
            this.counter++;
        }
        else{
            this.clearList();
            this.counter=0;
        }
    }

    createListItem(name, owner, stargazers_count) {
        this.element = document.createElement('div');
        this.element.classList.add("listOfReposetories");

        this.ulList = document.createElement('ul');
        this.liName = document.createElement('li', 'liInDiv');
        this.liName.append("Name: ", name);
        this.liOwner = document.createElement('li', 'liInDiv');
        this.liOwner.append("Owner: ", owner);
        this.liStarCount = document.createElement('li', 'liInDiv');
        this.liStarCount.append("Stars: ", stargazers_count);

        this.removeButton = document.createElement('button');
        this.removeButton.classList.add("removeButton");

        this.ulList.append(this.liName);
        this.ulList.append(this.liOwner);
        this.ulList.append(this.liStarCount);
        this.element.append(this.ulList);
        this.element.append(this.removeButton);
        this.includeList.append(this.element);
        this.removeElement(this.element);
    }

    removeElement(element) {
      this.removeButton.addEventListener('click',()=>{element.remove()})
    }

    clearList() {
        this.selectList.innerHTML = "";
    }

    debounseReposetories(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    }

}