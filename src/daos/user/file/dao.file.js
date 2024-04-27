import { FileDao  as SampleFileDao} from "../../sample/file.sample.js"

export class FileDao extends SampleFileDao{
    //ver que falta

    deleteByLastLogin(limitTime){
        throw new Error('NOT IMPLEMENTED')

    }
}