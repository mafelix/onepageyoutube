require 'pry'
# Homepage (Root path)
enable:sessions

helpers do
  def current_user
    current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def check_flash
    @flash = session[:flash] if session[:flash]
    session[:flash] = nil
  end
end

before do
  current_user
  check_flash
end

get '/' do
  erb :index
end

get '/logout' do
  session.clear
  redirect '/'
end

post '/signin' do
  @user = User.find_by(
    username: params[:username],
    password: params[:password]
    )
  if !@user.nil? && @user.password == params[:password]
    session[:user_id] = @user.id
    redirect '/'
  else
    session[:flash] = "Invalid username or password"
    redirect '/'
  end
end

post '/signup' do
  @user = User.new(
    username: params[:username],
    password: params[:password]
    )
  @user.save
  if @user.save
    session[:flash] = "Account successfully created"
    redirect '/'
  else
    session[:flash] = "Account could not be created"
    redirect '/'
  end
end