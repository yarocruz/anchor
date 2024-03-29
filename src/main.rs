use axum::{
    response::Html,
    routing::{get, get_service, post},
    Router
};

use tower_http::services::{ServeDir, ServeFile};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/hello", get(handler))
        .route("/greeting", post(greeting))
        .fallback_service(
            Router::new().nest_service("/", get_service(ServeDir::new("./assets")))
        );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Starting Server");
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<&'static str> {
    Html("<h1>Hello World!</h1>")
}

async fn greeting() -> Html<&'static str> {
    Html("<h1>From the input</h1>")
}


