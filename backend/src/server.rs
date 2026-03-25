use dotenvy::dotenv;
use std::{env, net::SocketAddr};
use axum::Router;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
  dotenv().ok();

  let port_str = env::var("PORT").unwrap_or_else(|_| "3000".to_string());

  let port: u16 = port_str
    .parse()
    .expect("PORT deve ser um número válido");

  let frontend = ServeDir::new("../frontend/dist");

  let app: Router = Router::new().fallback_service(frontend);

  let addr: SocketAddr = SocketAddr::from(([127, 0, 0, 1], port));
  let listener: TcpListener = TcpListener::bind(addr)
    .await
    .unwrap();

    println!("Servidor rodando http://{}", addr);

    axum::serve(listener, app)
      .await
      .unwrap();
}
