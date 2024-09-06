import fs from 'fs'
import path from 'path'

export const setupUserData = (stayLoggedIn: boolean): string | undefined => {
    const userDataDir = process.env.FILE_STORAGE_BASE_DIR ? path.join(process.env.FILE_STORAGE_BASE_DIR, "user_data") : undefined;
    if(userDataDir && !stayLoggedIn){
        if(fs.existsSync(userDataDir)){
            fs.rmdirSync(userDataDir, {recursive: true});
        }
    }
    return userDataDir;
}