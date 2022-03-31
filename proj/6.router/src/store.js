const Local = {
    getList(){
        let userStr = localStorage.getItem('userlist');
        let users = userStr?JSON.parse(userStr):[];
        return users;
    },
    add(user){
       let oldUsers =  Local.getList();
       oldUsers.push(user);
       localStorage.setItem('userlist', JSON.stringify(oldUsers));
    },
    get(id){
        let oldUsers = Local.getList();
        return oldUsers.find(item=>item.id == id);
    }
}

export default Local;