use axum::{
    response::Html,
    routing::get,
    Router
};
#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(handler));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<&'static str> {
    Html("<h1>Hello World!</h1>")
}
