import { AuthRepository } from 'src/domain/auth/repositories/auth.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from 'src/infrastructure/database/schemas/user.model';
import { AuthUser } from 'src/domain/auth/entities/auth-user';
import { AuthFactory } from 'src/infrastructure/factories/auth.factory';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<AuthUser | null> {
    if (!email) {
      return null;
    }

    const document = await this.userModel.findOne({ email }).exec();
    if (!document) {
      return null;
    }

    return AuthFactory.fromDocument(document);
  }

  async findById(id: string): Promise<AuthUser | null> {
    if (!id) {
      return null;
    }

    const document = await this.userModel.findOne({ _id: id }).exec();
    if (!document) {
      return null;
    }

    return AuthFactory.fromDocument(document);
  }

  async create(authUser: AuthUser): Promise<string | null> {
    if (!authUser) {
      return null;
    }

    const newUser = new this.userModel({
      username: authUser.username,
      email: authUser.email,
      password: authUser.password,
    });
    const savedUser = await newUser.save();
    return savedUser._id.toString();
  }

  async updateRefreshTokenById(id: string, token: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      refreshToken: token
    })
  }
}
