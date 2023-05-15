import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule, TRANSLATION_PROVIDER, TranslateLoaderService } from '@alfresco/adf-core';
import { ContentModule } from '@alfresco/adf-content-services';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { appRoutes } from './app.routes';
import { PreviewService } from './services/preview.service';
import { FileViewComponent } from './file-view/file-view.component';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { OpenaiViewComponent } from './openai-view/openai-view.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledNonBlocking', relativeLinkResolution: 'legacy' , enableTracing : true}),
        // ADF modules
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        DocumentsComponent,
        AppLayoutComponent,
        FileViewComponent,
        OpenaiViewComponent
    ],
    providers: [
        PreviewService,
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'app',
                source: 'resources'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
