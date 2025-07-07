import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Multer } from 'multer';

@ApiTags('Art')
@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiBody({
    description: 'Create a new art item',
    type: CreateArtDto,
  })
  create(
    @Body() createArtDto: CreateArtDto,
    @UploadedFile() image: Multer.File,
  ) {
    if (image) {
      createArtDto.imageUrl = `/uploads/${image.filename}`;
    }
    return this.artService.create(createArtDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all art items' })
  findAll() {
    return this.artService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Get a single art item by ID' })
  findOne(@Param('id') id: number) {
    return this.artService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateArtDto })
  update(@Param('id') id: number, @Body() updateArtDto: UpdateArtDto) {
    return this.artService.update(+id, updateArtDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number) {
    return this.artService.remove(+id);
  }
}
