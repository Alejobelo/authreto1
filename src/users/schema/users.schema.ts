import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UsersDocumenent = Users & Document; 
@Schema()
export  class Users {
    @Prop()
    user: string;

    @Prop()
    password: string;
 
}

export const UsersSchema = SchemaFactory.createForClass(Users);