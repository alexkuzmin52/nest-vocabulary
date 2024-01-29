import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from '../../decorators/api-file.decorator';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // TODO move upload to service

  @Post('upload')
  @ApiFile()
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
