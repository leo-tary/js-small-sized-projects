
/**
 *  
 *  Binary to decimal conversion for permissions
 *  Bitwise (Permissions System)
 *  readPermission:     00000001
 *  writePermission:    00000011
 *  ExecutePermission:  00000111
 * 
 *  Default Considerations:-
 *  Read (R) => Only Read
 *  Write (W) => Read + Write 
 *  Execute(E)  => Read + Write + Execute
 */


function Permission(){

    const globalPermissionsObj = {
        noPermission:0,
        readPermission: 1,
        writePermission: 3,
        executePermission: 7
    }

    // user Permission(default)
    this.userPermission = 0; 

    this.addPermission = function(permission) {

        this.userPermission = (globalPermissionsObj.hasOwnProperty(permission)) 
                            ? this.userPermission | globalPermissionsObj[permission]
                            : this.userPermission;
        
   
    }

    this.filterPermission= function(keepPermission){

        if(this.userPermission < globalPermissionsObj[keepPermission])
            return false;
        else 
            this.userPermission = (globalPermissionsObj.hasOwnProperty(keepPermission))
                                ? this.userPermission & globalPermissionsObj[keepPermission]
                                : this.userPermission;
        
    }

    this.getPermissions = (details = false) => {


        return (details) 
                ? Object.keys(globalPermissionsObj).find((key) => {
                                return globalPermissionsObj[key] === this.userPermission
                        })
                : this.userPermission;

    }


    this.checkUserPermissions = (permission , getPermissions = false) => {

        if(typeof permission === 'number'){

            const hasPermission = checkPermissionAuthenticity(permission);
            return (this.userPermission === permission && hasPermission) 
                    ? (getPermissions) 
                        ? this.getPermissions(true) : true
                    : false;


        }else{
            const hasPermission = (this.userPermission >= globalPermissionsObj[permission] && permission !== 'noPermission') 
                                ? (getPermissions)
                                                ? this.userPermission
                                                : true
                                : (getPermissions) 
                                                ? this.userPermission
                                                : false;
            return hasPermission;
        }
    }

    // Private Function

    checkPermissionAuthenticity = (userPermission) => {

        return Object.keys(globalPermissionsObj).some(function(key) {
             return (globalPermissionsObj[key] === userPermission);
        });

    }

    // getter/setter in case of accessing private property outside

    // Object.defineProperty(this , 'userPermission' , {
    //     set: function(value){
    //         userPermission = value;
    //     },
    //     get: function(){
    //         return userPermission;
    //     }
    // })
    

}

const permission = new Permission();

// Add Permission

permission.addPermission('writePermission');
console.log(permission.userPermission);

// Remove Permission

permission.filterPermission('executePermission');
console.log(permission.userPermission);


// To Check User Has 'x' Permission (say read)

const hasPermisson = permission.checkUserPermissions('readPermission' , false);
console.log(hasPermisson);

// Get User's Permission - Varient (detailed = name else number)

const permissions = permission.getPermissions();
console.log(permissions);

// To Check if User's permission is valid - this should be merged with (checkUserPermissions)

const perms = permission.checkUserPermissions(3,true);
console.log(perms);

// Remove "read" access (that means no access from now for user)

permission.filterPermission('noPermission');
console.log(permission.userPermission);


/**
 * 
 *  Another Implementation (Keeping Different Permission Bits) - Coming Up
 * 
 *  Read:-      00000001
 *  Write:-     00000010
 *  Execute:-   00000100
 */